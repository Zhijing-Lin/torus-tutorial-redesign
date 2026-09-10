// search-wrapper.js — live search + relevance ranking + smart typo correction + “showing results for”
(function () {
  const PAGE_SIZE   = 3;
  const DEBOUNCE_MS = 150;
  const STORE_KEY   = 'tutorialSearchState';

  const SUGGESTIONS = [
    'new project',
    'learning objectives',
    'project labels',
    'mcq',
    'curriculum'
  ];

  // ---------- utils ----------
  const debounce = (fn, ms) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), ms); }; };
  const esc = (s) => String(s)
    .replaceAll('&','&amp;').replaceAll('<','&lt;')
    .replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#039;");
  const normalize = (s) => (s || '').toLowerCase().normalize('NFKC').trim();
  const tokenize = (q) => normalize(q).split(/[\s,./\-_:;()]+/).filter(Boolean);

  function highlight(text, words){
    if (!words.length) return esc(text);
    const parts = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
    const re = new RegExp(`(${parts.join('|')})`, 'gi');
    return esc(text).replace(re, '<mark>$1</mark>');
  }

  function levenshtein(a, b){
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    const dp = new Array(n + 1);
    for (let j = 0; j <= n; j++) dp[j] = j;
    for (let i = 1; i <= m; i++) {
      let prev = dp[0]; dp[0] = i;
      for (let j = 1; j <= n; j++) {
        const tmp = dp[j];
        dp[j] = Math.min(
          dp[j] + 1,
          dp[j-1] + 1,
          prev + (a[i-1] === b[j-1] ? 0 : 1)
        );
        prev = tmp;
      }
    }
    return dp[n];
  }

  const STOP = new Set([
    'the','and','to','of','in','a','for','on','with','at','by','is','it','as','be',
    'this','that','your','you','from','or','are','can','will','into','an','any'
  ]);

  const GENERIC_TRANSCRIPT = new Set([
    'click','button','here','simply','now','first','also','see','using','used',
    'make','need','want','then','just','like','into','than','each','more'
  ]);

  const TIER = {
    title: 1,
    keyword: 2,
    description: 3,
    category: 4,
    transcript: 5
  };

  const ALIAS_GROUPS = [
    ['quiz', 'mcq', 'multiple choice', 'multiple-choice'],
    ['objective', 'objectives', 'learning objective', 'learning objectives'],
    ['login', 'log in', 'logging in'],
    ['ta', 'tas', 'teaching assistant']
  ];

  function conservativeStem(word) {
    const w = normalize(word);
    if (w.length < 3) return w;
    if (w.endsWith('ies') && w.length > 5) return w.slice(0, -3) + 'y';
    if (w.endsWith('ing') && w.length >= 9) return w.slice(0, -3);
    if (w.endsWith('ed') && w.length > 6) return w.slice(0, -2);
    if (w.endsWith('s') && !w.endsWith('ss') && !w.endsWith('us') && w.length > 4) {
      return w.slice(0, -1);
    }
    return w;
  }

  function stemForms(word) {
    const n = normalize(word);
    const s = conservativeStem(n);
    const forms = new Set([n, s]);
    if (s.length >= 3 && !s.endsWith('e')) forms.add(s + 'e');
    return forms;
  }

  function tokensRelated(a, b) {
    const A = stemForms(a);
    const B = stemForms(b);
    for (const x of A) if (B.has(x)) return true;
    return false;
  }

  function expandQuery(query) {
    const tokens = tokenize(query);
    const phrase = normalize(query);
    const expanded = new Set(tokens);
    const extraPhrases = new Set();
    for (const group of ALIAS_GROUPS) {
      const hit = group.some((alias) => {
        const na = normalize(alias);
        const aliasToks = tokenize(alias);
        if (phrase === na) return true;
        if (aliasToks.length === 1) {
          return tokens.some((qt) => tokensRelated(qt, aliasToks[0]));
        }
        return aliasToks.every((at) => tokens.some((qt) => tokensRelated(qt, at)));
      });
      if (!hit) continue;
      for (const alias of group) {
        const aliasToks = tokenize(alias);
        if (aliasToks.length === 1) expanded.add(aliasToks[0]);
        else extraPhrases.add(normalize(alias));
      }
    }
    const matchTokens = [...expanded].filter((t) => t.length >= 2 && !STOP.has(t));
    return { tokens, expanded: [...expanded], matchTokens, extraPhrases: [...extraPhrases], phrase };
  }

  function matchedTokensInText(text, qTokens) {
    const ftoks = tokenize(text || '');
    return qTokens.filter((qt) => ftoks.some((ft) => tokensRelated(qt, ft)));
  }

  function containsPhrase(text, phrase) {
    if (!phrase) return false;
    return normalize(text || '').includes(phrase);
  }

  // ---------- dictionary (titles, keywords, descriptions — not transcript) ----------
  function buildDictionary(index){
    const counts = new Map();
    const bump = (w) => {
      const n = normalize(w);
      if (n.length >= 3 && !STOP.has(n)) counts.set(n, (counts.get(n) || 0) + 1);
    };

    for (const item of index || []) {
      for (const w of tokenize(item.title || '')) bump(w);
      for (const w of tokenize(item.description || '')) bump(w);
      if (Array.isArray(item.keywords)) {
        for (const kw of item.keywords) {
          bump(kw);
          for (const w of tokenize(kw)) bump(w);
        }
      }
    }
    for (const s of SUGGESTIONS) for (const w of tokenize(s)) bump(w);
    for (const group of ALIAS_GROUPS) for (const a of group) for (const w of tokenize(a)) bump(w);
    return counts;
  }

  function suggestCorrections(word, dict, limit = 2){
    if (!word || word.length < 3) return [];
    const maxDist = word.length <= 4 ? 1 : word.length <= 7 ? 2 : 3;
    const cand = [];
    for (const [w, freq] of dict.entries()) {
      if (w === word) continue;
      if (Math.abs(w.length - word.length) > maxDist) continue;
      const d = levenshtein(word, w);
      if (d <= maxDist) cand.push({ w, d, freq });
    }
    cand.sort((a,b) => (a.d - b.d) || (b.freq - a.freq) || a.w.localeCompare(b.w));
    const out = [];
    for (const c of cand) { if (!out.includes(c.w)) out.push(c.w); if (out.length >= limit) break; }
    return out;
  }

  function buildLookups(index){
    const titleSet = new Set();
    const keywordSet = new Set();
    for (const it of index || []) {
      const t = normalize(it.title || '');
      if (t) titleSet.add(t);
      if (Array.isArray(it.keywords)) for (const kw of it.keywords) keywordSet.add(normalize(kw));
    }
    const chipSet = new Set(SUGGESTIONS.map(normalize));
    return { titleSet, keywordSet, chipSet };
  }

  function rankSuggestions(phrases, dict, lookups){
    const { titleSet, keywordSet, chipSet } = lookups;
    const scored = [];
    for (const p of phrases) {
      const toks = tokenize(p);
      let score = 0;
      for (const t of toks) score += (dict.get(t) || 0);
      if (titleSet.has(normalize(p))) score += 50;
      if (chipSet.has(normalize(p)))  score += 20;
      for (const t of toks) if (keywordSet.has(t)) score += 10;
      scored.push({ p, score, len: p.length });
    }
    scored.sort((a,b) => (b.score - a.score) || (a.len - b.len) || a.p.localeCompare(b.p));
    return scored.map(x => x.p);
  }

  // ---------- NEW: validate corrections ----------
  function suggestCorrectionsForQuery(query, dict, lookups, index) {
    const tokens = tokenize(query);
    if (!tokens.length) return [];

    const perToken = tokens.map(tok => [tok, ...suggestCorrections(tok, dict, 2)]);
    const suggestions = new Set();
    const MAX_COMBOS = 128;
    function dfs(i, cur){
      if (suggestions.size >= MAX_COMBOS) return;
      if (i === perToken.length) {
        const phrase = cur.join(' ');
        if (phrase !== query) suggestions.add(phrase);
        return;
      }
      for (const choice of perToken[i]) {
        cur.push(choice);
        dfs(i+1, cur);
        cur.pop();
        if (suggestions.size >= MAX_COMBOS) break;
      }
    }
    dfs(0, []);

    const ranked = rankSuggestions(Array.from(suggestions), dict, lookups);

    const valid = [];
    for (const s of ranked) {
      const res = rankedSearch(s, index);
      if (res.length > 0) valid.push({ phrase: s, hits: res.length });
      if (valid.length >= 5) break;
    }
    return valid.map(v => v.phrase);
  }

  function makeSnippet(source, words){
    if (!source) return '';
    const lower = source.toLowerCase();
    let bestIdx = Infinity;
    for (const w of words) {
      const i = lower.indexOf(w);
      if (i !== -1 && i < bestIdx) bestIdx = i;
    }
    const base = isFinite(bestIdx) ? bestIdx : 0;
    let start = Math.max(0, base - 48);
    let end   = Math.min(source.length, base + 72);
    if (start > 0) {
      const prevSpace = source.lastIndexOf(' ', start);
      if (prevSpace !== -1) start = prevSpace + 1;
    }
    if (end < source.length) {
      const prevSpace = source.lastIndexOf(' ', end);
      if (prevSpace > start + 20) end = prevSpace;
    }
    let excerpt = source.slice(start, end).replace(/\s+/g, ' ').trim();
    if (start > 0) excerpt = '…' + excerpt;
    if (end < source.length) excerpt = excerpt + '…';
    if (excerpt.length > 140) excerpt = excerpt.slice(0, 137).replace(/\s+\S*$/, '') + '…';
    return highlight(excerpt, words);
  }

  function analyzeItem(item, q) {
    const title = (item.title || '').toString();
    const description = (item.description || '').toString();
    const category = (item.category || '').toString();
    const section = (item.section || '').toString();
    const transcript = (item.transcript || '').toString();
    const keywords = Array.isArray(item.keywords) ? item.keywords : [];
    const keywordText = keywords.join(' ');
    const catSecText = `${category} ${section}`;
    const matchTokens = q.matchTokens || q.expanded;
    const phrases = [q.phrase, ...(q.extraPhrases || [])].filter(Boolean);

    const titleHits = matchedTokensInText(title, matchTokens);
    const descHits = matchedTokensInText(description, matchTokens);
    const catHits = matchedTokensInText(catSecText, matchTokens);
    const transHits = matchedTokensInText(transcript, matchTokens);

    const kwMatched = new Set();
    let keywordPhrase = false;
    for (const kw of keywords) {
      const nk = normalize(kw);
      if (!nk) continue;
      if (phrases.some((p) => nk === p || (p.length >= 4 && (nk === p || containsPhrase(kw, p))))) {
        keywordPhrase = true;
      }
      for (const qt of matchTokens) {
        if (tokensRelated(qt, nk) || tokenize(kw).some((kt) => tokensRelated(qt, kt))) {
          kwMatched.add(qt);
        }
      }
    }

    const titlePhrase = phrases.some((p) => p.length >= 3 && containsPhrase(title, p));
    const descPhrase = phrases.some((p) => p.length >= 3 && containsPhrase(description, p));
    const transPhrase = containsPhrase(transcript, q.phrase);

    const fields = [];
    if (titlePhrase || titleHits.length) fields.push('title');
    if (keywordPhrase || kwMatched.size) fields.push('keywords');
    if (descPhrase || descHits.length) fields.push('description');
    if (catHits.length) fields.push('category/section');
    if (transHits.length || transPhrase) fields.push('transcript');

    let tier = 99;
    if (titlePhrase || titleHits.length) tier = TIER.title;
    else if (keywordPhrase || kwMatched.size) tier = TIER.keyword;
    else if (descPhrase || descHits.length) tier = TIER.description;
    else if (catHits.length) tier = TIER.category;
    else if (transHits.length || transPhrase) tier = TIER.transcript;

    const W = {
      exactTitle: 120,
      startsTitle: 70,
      containsTitle: 50,
      tokenInTitle: 18,
      keywordPhrase: 40,
      tokenInKeyword: 16,
      phraseDesc: 22,
      tokenInDesc: 10,
      tokenInCatSec: 8,
      phraseTranscript: 4,
      tokenInTranscript: 2,
      sameSection: 6
    };

    let score = 0;
    const nTitle = normalize(title);
    if (nTitle === q.phrase) score += W.exactTitle;
    if (nTitle.startsWith(q.phrase)) score += W.startsTitle;
    if (titlePhrase) score += W.containsTitle;
    score += titleHits.length * W.tokenInTitle;
    if (keywordPhrase) score += W.keywordPhrase;
    score += kwMatched.size * W.tokenInKeyword;
    if (descPhrase) score += W.phraseDesc;
    score += descHits.length * W.tokenInDesc;
    score += catHits.length * W.tokenInCatSec;
    if (transPhrase) score += W.phraseTranscript;
    score += transHits.length * W.tokenInTranscript;

    const activeSection = window.ACTIVE_SECTION && normalize(window.ACTIVE_SECTION);
    if (activeSection && normalize(section) === activeSection) score += W.sameSection;

    const meaningful = q.tokens.filter((t) => t.length >= 3 && !STOP.has(t));
    const transOnly = tier === TIER.transcript;
    const weakTranscriptToken = meaningful.length === 1
      && (meaningful[0].length < 5 || GENERIC_TRANSCRIPT.has(meaningful[0]));

    let eligible = false;
    if (titlePhrase || titleHits.length || keywordPhrase || kwMatched.size) eligible = true;
    else if (descPhrase || descHits.length) eligible = true;
    else if (catHits.length && meaningful.length <= 2) eligible = true;
    else if (transOnly && meaningful.length && transHits.length >= meaningful.length && !weakTranscriptToken) {
      eligible = true;
    }

    const origMeaningful = q.tokens.filter((t) => t.length >= 3 && !STOP.has(t));
    const origHits = new Set();
    for (const text of [title, keywordText, description, catSecText, transcript]) {
      for (const t of matchedTokensInText(text, origMeaningful)) origHits.add(t);
    }
    const WEAK_ALONE = new Set(['multiple', 'add', 'new', 'page', 'set', 'use', 'open', 'content']);
    const origDistinct = [...origHits].filter((t) => !WEAK_ALONE.has(normalize(t)));
    if (eligible && origMeaningful.length >= 2 && origDistinct.length === 0 && !titlePhrase && !descPhrase) {
      eligible = false;
    }

    let snippetSource = '';
    if (transHits.length || transPhrase) snippetSource = transcript;

    return { eligible, tier, score, fields, snippetSource };
  }

  function rankedSearch(query, index){
    const q = expandQuery(query);
    if (!q.tokens.length) return [];

    const scored = [];
    for (const item of index || []) {
      const analysis = analyzeItem(item, q);
      if (!analysis.eligible || analysis.score <= 0) continue;

      const highlightWords = [...new Set([...q.tokens, ...q.expanded])];
      scored.push({
        item,
        score: analysis.score,
        tier: analysis.tier,
        fields: analysis.fields,
        layer: (item.title || 'Untitled'),
        snippetHtml: analysis.snippetSource
          ? makeSnippet(analysis.snippetSource, highlightWords)
          : ''
      });
    }

    scored.sort((a, b) => (a.tier - b.tier)
      || (b.score - a.score)
      || (a.layer.length - b.layer.length)
      || a.layer.localeCompare(b.layer));
    return scored;
  }

  function plainSnippetText(html){
    return String(html || '')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&#039;/g, "'")
      .replace(/[…]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function renderBatch(resultsEl, items, start, count, navigate){
    const tpl = resultsEl.closest('#searchModal')?.querySelector('#sw-result-template');
    const end = Math.min(items.length, start + count);
    for (let i = start; i < end; i++) {
      const { layer, snippetHtml, item } = items[i];
      if (!tpl) continue;
      const rec = item || {};
      const node = tpl.content.cloneNode(true);
      const titleEl = node.querySelector('.sw-result-title');
      const pathEl  = node.querySelector('.sw-result-path');
      const descEl  = node.querySelector('.sw-result-desc');
      const matchEl = node.querySelector('.sw-result-match');

      if (titleEl) titleEl.textContent = rec.title || layer || 'Untitled';

      const cat = (rec.category || '').trim();
      const section = (rec.section || '').trim();
      if (pathEl) {
        if (cat || section) pathEl.textContent = [cat, section].filter(Boolean).join(' → ');
        else pathEl.hidden = true;
      }

      if (descEl) {
        if (rec.description) descEl.textContent = rec.description;
        else descEl.hidden = true;
      }

      if (matchEl) {
        const descPlain = normalize(rec.description || '');
        const snipPlain = normalize(plainSnippetText(snippetHtml));
        const useful = snippetHtml
          && snipPlain
          && snipPlain !== descPlain
          && !descPlain.includes(snipPlain);
        if (useful) matchEl.innerHTML = snippetHtml;
        else matchEl.hidden = true;
      }

      node.querySelector('.sw-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigate?.({ title: rec.title || layer, page: rec.page || '' });
      });
      resultsEl.appendChild(node);
    }
    return end;
  }

  function loadState(){
    try { return JSON.parse(sessionStorage.getItem(STORE_KEY) || '{}'); }
    catch { return {}; }
  }
  function saveState(q, rendered){
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify({ q, rendered })); }
    catch {}
  }

  // ---------- mount ----------
  window.SearchWrapperMount = function mount(root, { close, navigate } = {}) {
    const input      = root.querySelector('#searchInput');
    const resultsEl  = root.querySelector('#results');
    const suggestEl  = root.querySelector('#suggest');
    const suggestRow = root.querySelector('.sw-suggest-row');
    const closeBtn   = root.querySelector('#closeSearch');

    const INDEX = window.TUTORIAL_INDEX || [];
    const DICT  = buildDictionary(INDEX);
    const LOOK  = buildLookups(INDEX);

    function updateSuggestionVisibility(q) {
  if (!suggestRow) return;

  if (q && q.trim().length > 0) {
    suggestRow.style.display = 'none';
  } else {
    const state = loadState();
    if (state.q && state.q.trim().length > 0) {
      suggestRow.style.display = 'none';
    } else {
      suggestRow.style.display = '';
    }
  }
}


    let ranked = [];
    let rendered = 0;
    let currentQ = '';

    function renderSuggestions(){
      if (!suggestEl) return;
      suggestEl.innerHTML = '';
      SUGGESTIONS.forEach(word => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'sw-chip';
        b.textContent = word;
        b.addEventListener('click', () => { input.value = word; run.flush?.(); });
        suggestEl.appendChild(b);
      });
      if (suggestRow) suggestRow.hidden = false;
    }
    function hideSuggestions(){ if (suggestRow) suggestRow.hidden = true; }

    function showLoadMore(){
      if (rendered >= ranked.length) return;
      const more = document.createElement('div');
      more.className = 'sw-actions';
      more.style.textAlign = 'center';
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'sw-btn sw-load';
      btn.textContent = 'Load more';
      btn.addEventListener('click', () => {
        more.remove();
        rendered = renderBatch(resultsEl, ranked, rendered, PAGE_SIZE, navigate);
        saveState(currentQ, rendered);
        showLoadMore();
      });
      more.appendChild(btn); resultsEl.appendChild(more);
    }

    function doSearchNow(){
      const q = (input.value || '').trim();
      currentQ = q;
      resultsEl.innerHTML = '';

      if (!q) {
        ranked = []; rendered = 0; saveState('', 0);
        renderSuggestions(); return;
      }

      hideSuggestions();
      const scored = rankedSearch(q, INDEX);
      ranked = scored;

      if (ranked.length === 0) {
        // Try valid corrections
        const validCorrections = suggestCorrectionsForQuery(q, DICT, LOOK, INDEX);
        if (validCorrections.length > 0) {
          const best = validCorrections[0];
          const correctedResults = rankedSearch(best, INDEX);
          const note = document.createElement('div');
          note.className = 'sw-block';
          note.innerHTML = `<p class="sw-found" style="color:#9aa3b2"> 
            Showing results for <span style="color:var(--blue);font-weight:700">“${esc(best)}”</span>.</p>`;
          resultsEl.appendChild(note);
          ranked = correctedResults;
          rendered = renderBatch(resultsEl, ranked, 0, PAGE_SIZE, navigate);
          saveState(best, rendered);
          showLoadMore();
          return;
        }

        // Otherwise: no valid correction either
        const none = document.createElement('div');
        none.className = 'sw-block';
        none.innerHTML = `<p class="sw-found" style="color:#9aa3b2">No match found.</p>`;
        resultsEl.appendChild(none);
        return;
      }

      rendered = renderBatch(resultsEl, ranked, 0, PAGE_SIZE, navigate);
      const state = loadState();
      if (state.q && state.q === q && state.rendered && state.rendered > rendered) {
        const target = Math.min(state.rendered, ranked.length);
        const need = target - rendered;
        if (need > 0) rendered = renderBatch(resultsEl, ranked, rendered, need, navigate);
      }
      saveState(q, rendered);
      showLoadMore();
    }

    const run = debounce(doSearchNow, DEBOUNCE_MS);
    run.flush = doSearchNow;
    
    input.addEventListener('input', (e) => {
      updateSuggestionVisibility(e.target.value);
    run();
    });



    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (ranked && ranked.length) {
          const first = ranked[0];
          navigate?.({ title: first.layer, page: first.item?.page || '' });
        }
      }
    });
    closeBtn?.addEventListener('click', () => close?.());

    const state = loadState();
if (state.q) input.value = state.q;

updateSuggestionVisibility(input.value);

run.flush();

    setTimeout(() => input?.focus(), 0);
  };

  window.__tutorialSearch = { rankedSearch, suggestCorrectionsForQuery, buildDictionary, buildLookups };
})();
