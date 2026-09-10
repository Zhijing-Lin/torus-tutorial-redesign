// tutorial-transcript.js
//
// Search corpus for the Tutorial Hub.
// Each TUTORIAL_INDEX record: title, category, section, page, description, keywords, transcript.
// Titles match the sidebar. Transcripts come from VTT captions when available,
// otherwise from a previously authored full transcript. Title-only tutorials use "".
// Keep this format when adding tutorials.

window.TUTORIAL_INDEX = [
  // === Introduction ===
  {
    title: "WELCOME!",
    category: "Introduction",
    section: "Introduction",
    page: "pages/introduction/welcome.html",
    description: "Learn how to pick a role, browse the menu, search tutorials, and keep videos in picture-in-picture.",
    keywords: ["get started", "pick role", "menu", "search", "picture-in-picture", "PiP", "feedback"],
    transcript: ""
  },
  {
    title: "Get Started: Logging In",
    category: "Introduction",
    section: "Introduction",
    page: "pages/introduction/logging-in.html",
    description: "Learn how to choose Author, Instructor, or Student to open the matching tutorial set.",
    keywords: ["log in", "login", "author", "instructor", "student", "role", "home"],
    transcript: ""
  },

  // === Author — Set Up Your Course ===
  {
    title: "Course Author Page Overview",
    category: "Author",
    section: "Set Up Your Course",
    page: "pages/set-up-your-course/course-author-page-overview.html",
    description: "Learn how to use the author landing page, switch roles from the workspace menu, and open a project.",
    keywords: ["landing page", "workspace menu", "switch roles", "author", "project list", "projects"],
    transcript: "This is the course author landing page. On the left side, you will see the workspace menu, which confirms that you are logged in as an author. If you ever need to switch roles, you can do so by selecting a different role from this menu. On a course author page, you will find a list of all your projects, also known as courses. From here you can easily access each project. Now, let's get started by creating a new project."
  },
  {
    title: "Create a New Project",
    category: "Author",
    section: "Set Up Your Course",
    page: "pages/set-up-your-course/create-a-new-project.html",
    description: "Learn how to start a project by naming it and opening it later from your project list.",
    keywords: ["new project", "create project", "start project", "project name", "project list", "create"],
    transcript: "To create a new project, simply click the \"New Project\" button. Enter a name for your project. That hit \"Create\" to get started. Once your project is created, you can begin working on your course right away. You can also return to your course later by clicking its project title from your project list."
  },
  {
    title: "Set Up Your Project (Course Overview)",
    category: "Author",
    section: "Set Up Your Course",
    page: "pages/set-up-your-course/course-overview.html",
    description: "Learn how to set the project title, description, learning language, and labels on the overview page.",
    keywords: ["overview", "project title", "project description", "learning language", "project attributes", "project labels", "settings"],
    transcript: "When you enter a course, you will be taken to the overview page for that course. Here you can enter and adjust some basic information and settings for your course. The first step is setting up your project title, which you already entered when creating the course. You can change this at any time. Next, it's recommended to add a project description to provide context for your course. If you're designing a language course, you may want to adjust the learning language on the project attributes. If you're designing a course with course specific names for the structural elements of units, modules, sections, you may want to adjust the project labels to customize these containers."
  },
  {
    title: "Collaborators and Publishing Visibility",
    category: "Author",
    section: "Set Up Your Course",
    page: "pages/set-up-your-course/collaborators-visibility.html",
    description: "Learn how to invite collaborators and set who can create course sections from your project.",
    keywords: ["invite", "collaborator", "email invitation", "editing access", "publishing", "visibility", "permissions", "open", "restricted", "course section"],
    transcript: "If you're working on a collaborative project, you can invite team members as collaborators. When you add a collaborator, they will receive an email invitation. And once they accept it, they will gain editing access to the course. Keep in mind that tourists will not allow multiple users to edit the same page concurrently. A user editing a page must leave that page before any other project collaborators can begin to edit the same page. Remember to communicate and coordinate with your collaborators. Once you have developed your course, you will likely want to deliver it to students. In Torus, this is done by creating course sections from the project you author. Students can then enroll in a course section to take the course. The publishing visibility setting controls who will be able to create co sections from your project. Under the default setting, \"project authors\", only you and your collaborators will be able to use your project to create core sections. \"Open\" will allow any instructor to create a course section from your project. \"Restricted\" allows you to grant permission to specific authoring accounts or institutions. Once you set the basic details, you can continue with developing your course. You can return to adjust any overview settings at any time. To learn more about other available settings, you can check out discussion notes, surveys and transformation payment code."
  },
  {
    title: "Project Attributes",
    category: "Author",
    section: "Set Up Your Course",
    page: "pages/set-up-your-course/project-attributes.html",
    description: "Learn how to review and edit project attributes.",
    keywords: ["attributes", "project settings", "properties", "language", "settings"],
    transcript: ""
  },
  {
    title: "Project Labels",
    category: "Author",
    section: "Set Up Your Course",
    page: "pages/set-up-your-course/project-labels.html",
    description: "Learn how to rename units, modules, and sections so the hierarchy matches your structure.",
    keywords: ["labels", "rename", "units", "modules", "sections", "containers", "hierarchy", "weeks"],
    transcript: "Torus follows a default hierarchy of units, modules, sections, where a unit can contain multiple modules and a module can contain multiple sections. Units, modules, and sections can all contain pages with course content. You can rename these containers to better fit your course structure. For example, if your course is structured by weeks, you can rename units to weeks to reflect the weekly progression of your lessons. If you're designing a language course, you can rename these structural containers in your target language."
  },
  {
    title: "Advanced Activities",
    category: "Author",
    section: "Set Up Your Course",
    page: "pages/set-up-your-course/advanced-activities.html",
    description: "Learn how to work with advanced activities in project setup.",
    keywords: ["advanced activities", "activities", "enable activities", "activity types", "settings"],
    transcript: ""
  },
  {
    title: "Discussion, Notes, and Survey",
    category: "Author",
    section: "Set Up Your Course",
    page: "pages/set-up-your-course/discussion-notes-survey.html",
    description: "Learn how to set up discussion, notes, and survey options for a project.",
    keywords: ["discussion", "discussion board", "notes", "notebook", "survey", "questionnaire", "feedback"],
    transcript: ""
  },
  {
    title: "Transformation Payment Code",
    category: "Author",
    section: "Set Up Your Course",
    page: "pages/set-up-your-course/transformation-payment-code.html",
    description: "Learn how to enter or manage a transformation payment code.",
    keywords: ["transformation", "payment code", "payment", "code", "license", "access code"],
    transcript: ""
  },

  // === Author — Develop Your Course ===
  {
    title: "Learning Objectives",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/learning-objectives.html",
    description: "Learn how to create learning objectives and see which pages and activities use each one.",
    keywords: ["objective", "create objective", "backwards design", "attach objectives", "pages", "activities", "usage"],
    transcript: "On the left hand menu, below overview is the create menu. Here you will develop the content of your course. In accordance with backwards design, we start with objectives, then assessment activities, and finally, instructional content in a course curriculum. Objectives will take you to the learning objectives page. Learning objectives are the basis of educational data analysis and engineering student success. Refer to the linked CMU Uerly Center guide on learning objectives to understand the importance of attaching objectives to pages and activities. To create a learning objective, click create new objective here. Enter your text in a dialog box. Then click create. Now you will see a list of all your learning objectives displayed here. On the right side, you can track how many pages and activities in your course are using each objective."
  },
  {
    title: "Create Containers",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/create-containers.html",
    description: "Learn how to build course structure by creating units, modules, and sections in Curriculum.",
    keywords: ["curriculum", "create unit", "module", "section", "structure", "containers", "hierarchy", "options"],
    transcript: "The curriculum tab in the course author menu is where you will edit your course structure and course content. Remember, Torus follows a default hierarchy of units, modules, sections. Where a unit contains multiple modules, a module can contain multiple sections. Units, modules, and sections can all contain pages with course content. If you want, you can rename these containers and overview to better fit your course structure. To set the structure of your course, you can start by creating a unit. Click \"create a unit\", your unit will be created with the default name \"Unit1: Unit\". Torus numbers the units automatically. As to create or rearrange more units, Torus will update the numbering accordingly. To change the name of the unit, click the drop down menu and click \"options\", then change the title and click \"save\". Inside your unit, you can create a module. Following the same steps you use to create a unit, then inside of the module, you can create a section. Again following the same steps you use to create a unit. You can create as many units, modules and sections as you need for your course structure. You can also create pages at any level of the structure. Inside of a section, a module, a unit, or at the top level of your curriculum."
  },
  {
    title: "Create a Page",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/create-a-page.html",
    description: "Learn how to add a practice or scored page inside a unit, module, or section.",
    keywords: ["new page", "practice page", "scored page", "ungraded", "graded", "assessment", "exam", "checkpoint"],
    transcript: "Now let's add some pages. To create a new page, start by selecting 'Practice' in this box. Once selected, a new page will appear here. If you want to add a page inside a specific unit, module, or section, simply click on the container and just create a page here. A practice page is intended for ungraded activities, allowing learners to engage with the content without impacting their scores. In contrast, a scored page is used for graded activities, such as assessment, checkpoints, and exams. You will notice that practice pages and score pages have distinct icons in your curriculum list. These icons help you easily differentiate between content types and track the structure of your course."
  },
  {
    title: "Practice Page Options",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/practice-page-options.html",
    description: "Learn how to change a page title and scoring type in page options, then save.",
    keywords: ["page options", "page title", "scoring type", "unscored", "scored assessment", "practice page", "scored page"],
    transcript: "As with units and other containers, page titles will be seen by both you and students in your course structure. Page titles will also appear at the top of their page. In general, page titles should be meaningful and descriptive of the content on the page. There are two ways to change the page title. First, as with containers, open the dropdown menu, select 'options', and update the page title here. In the page options menu, you will see that since you selected a practice page, the scoring type is set to unscored practice page by default. If you change your mind and want to turn your practice page into a scored page. You can change the scoring type to score assessment and continue to adjust the score page options for this page. Remember to always click 'save' at the end when you finish editing your page options."
  },
  {
    title: "Edit & Save Page",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/edit-save-page.html",
    description: "Learn how to open Edit Page and rely on automatic saving while you edit content.",
    keywords: ["edit page", "autosave", "auto save", "save", "editing", "page content"],
    transcript: "Now let's click 'edit page' to create and edit your page content. First things first, Torus automatically saves all the changes you make while you're editing page content. So you don't need to click any button to save your editing progress."
  },
  {
    title: "Edit Page Title",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/edit-page-title.html",
    description: "Learn how to change a page title with Edit Title and save that title separately from content.",
    keywords: ["edit title", "page title", "rename page", "save title", "save button"],
    transcript: "Edit Page Title: The one exception is the Page Title., If you would like to edit your page title while you are editing your page content, click Edit Title (highlight) to edit your title, and click save to save your modified title. This save button is only needed to save the new title, not the page content, because page content is, again, automatically saved."
  },
  {
    title: "Add Learning Objectives in Page",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/add-los-in-page.html",
    description: "Learn how to attach or create learning objectives on a content page.",
    keywords: ["attach objectives", "map objectives", "select objective", "create new objective", "checkbox", "multiple objectives", "LO"],
    transcript: "In accordance with Learning Engineering practices, all pages should generally have learning objectives. You have already seen how you can create learning objectives from the learning objectives page. At the top of each content page in a tourists course, you can select or create learning objective for that page. If you already created a learning objective that you want to map to the page, you can select and attach it by checking the box beside in the drop down menu. You can also create a new learning objective here by directly typing it in the learning objectives bar and clicking create new objective when you're done. You can have multiple learning objectives on the same page."
  },
  {
    title: "Add Paragraph",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/add-paragraph.html",
    description: "Learn how to add a paragraph block and insert text, images, tables, links, and YouTube.",
    keywords: ["paragraph", "paragraph block", "insert content", "rich text", "hyperlink", "images", "tables", "YouTube"],
    transcript: "Add Paragraph: Torus allows you to add multiple kinds of content to a page. When you first enter a new page, you will see the entry box where you will be able to author your content. At the bottom, you will see Insert Content, which is the small plus icon with a line indicating its position. You will always see this button while you edit a page. Above that, you will see the instructions “Type here or use + to begin…” The new page has pre-created a paragraph block to help you begin adding content. In a paragraph block, you can add rich content such as text, images, tables, YouTube, etc. First, of course, you can add text by typing directly. For more options, you can use the menu that appears when you click inside the paragraph block. You can bold and italicize, format your text as code, and add hyperlinks."
  },
  {
    title: "Paragraph Toolbar",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/paragraph-toolbar.html",
    description: "Learn how to use the paragraph toolbar while editing a paragraph.",
    keywords: ["toolbar", "formatting", "format text", "rich text", "paragraph"],
    transcript: ""
  },
  {
    title: "Paragraph Toolbar: Insert",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/paragraph-toolbar-insert.html",
    description: "Learn how to insert items from the paragraph toolbar.",
    keywords: ["insert", "toolbar", "paragraph", "insert menu", "media"],
    transcript: ""
  },
  {
    title: "Insert Content",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/insert-content.html",
    description: "Learn how to insert content onto a page.",
    keywords: ["insert", "add content", "plus button", "blocks", "content types"],
    transcript: ""
  },
  {
    title: "Add Multiple-Choice Questions (MCQ)",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/add-mcq.html",
    description: "Learn how to add multiple-choice questions.",
    keywords: ["MCQ", "multiple choice", "quiz", "question", "assessment", "add question"],
    transcript: ""
  },
  {
    title: "Activity Bank",
    category: "Author",
    section: "Develop Your Course",
    page: "pages/develop-your-course/activity-bank.html",
    description: "Learn how to use the activity bank.",
    keywords: ["activity bank", "question bank", "item bank", "reuse activities", "pool"],
    transcript: ""
  },

  // === Instructor — Link Course to LMS ===
  {
    title: "Add and Configure OLI Torus to Canvas",
    category: "Instructor",
    section: "Link Course to LMS",
    page: "pages/link-course-to-lms/add-to-canvas.html",
    description: "Learn how to add an OLI link in Canvas through the navigation menu, an assignment, or a module.",
    keywords: ["Canvas", "LMS", "LTI", "external tool", "navigation menu", "assignment", "module", "integrate", "configure", "publish"],
    transcript: "The first thing you need to do when integrating Torus to Canvas is to ensure that OLI Torus is registered as an LTI Advantage Tool in your institution's Canvas system. This is typically handled by a Canvas administrator. If your Canvas admin hasn't integrated OLI Torus yet, contact OLI support at oli-help@cmu.edu. Okay, now to place the OLI Torus link to Canvas, you have three options, the navigation menu, an assignment, or a module. Adding OLI Torus to the navigation menu is recommended if you and students need to enter it frequently. This will result in OLI Torus also being visible on the Canvas class homepage. Adding OLI as an assignment is the recommended placement. This allows you to place OLI in your weekly curriculum and assign the reading as homework or out-of-class activities. Adding OLI Torus as a module will allow students to navigate to OLI through the module view. To avoid confusion, add your Torus course link in only one place, navigation menu, assignments, or modules. Option one, add the link to the navigation menu. Go to Settings at the bottom of the Canvas navigation menu, click the Navigation tab on the top, and scroll to find OLI Torus, not the other ones under Disabled Items. Drag it up to the list of enabled navigation items and click Save. OLI Torus will now appear in your course's left-hand menu. Option two, add the link in an assignment. Click Assignments, Add Assignment, and add a title. This is what students will see when they click on Assignments in the Canvas class. Scroll down to Submission Type, select External Tool, click Find, choose OLI Torus from the list, and click Load in a New Tab. Click Save and Publish or Save. If necessary, publish the OLI Torus assignment by clicking the Not Published icon on the right side of the page. Option three, add the link in a module. Click Modules in the nav menu. Then create a new module. Give the module a name such as OLI Torus Course, or base the title on your Torus content, and click Add Module. In the new module, click the plus sign and select External Tool. Select OLI Torus from the list, update the title if you like, click Load in a New Tab, and click Add Item. Publish the OLI Torus module by clicking the Unpublished icon on the right end of the OLI Torus module. And once you've added the link to Canvas, it's time to configure your OLI Torus course materials for use with your students. Click the OLI Torus link you just added to load it in a new tab and configure your OLI Torus materials. Click Start and follow the prompts. Select a source material to base your course on. Use the search feature to find the desired content if necessary. Now enter basic info link, course name, course section number, can be a catalog number or CRN, for example, and modality for how class meets and other course details. Voila, your section has now been created. Note that once set up, all links will point to the same OLI Torus course no matter where students access it from in Canvas. Students have no OLI Torus accounts. They will access everything from the Canvas link. There you have it. In just a few steps, you can add and configure OLI Torus in your Canvas course. If you need to unlink a course, contact OLI support at oli-help@cmu.edu."
  },

  // === Instructor — Scheduling and Assessment ===
  {
    title: "Use the Scheduling Tool",
    category: "Instructor",
    section: "Scheduling and Assessment",
    page: "pages/schedule-and-assessment/schedule-setting.html",
    description: "Learn how to set a course timeline, due dates, and suggested dates on the Gantt-style schedule.",
    keywords: ["schedule", "timeline", "due dates", "Gantt", "suggested dates", "in-class activity", "advanced gating", "accommodations", "student exceptions"],
    transcript: "Under your course's Manage Settings, scroll down to Curriculum and click into the Scheduling & Assessment Settings. Now we see a page with four tabs of settings. In general, the Schedule tab lets you create a suggested course timeline for students to follow. The Assessment Settings tab allows you to configure each assessment item in more detail. The Student Expectations tab enables you to set accommodations for individual students based on their needs. Finally, Advanced Gating is for instructors who want more control over how and when course materials become accessible. If you need help with Advanced Gating, contact OLI Help at oli-help@cmu.edu. Let's start with the Scheduling setting. Here you will see your course timeline laid out across weeks. Each line here represents a unit of the course. Later, you will have an adjustable schedule on this page. To start with, click Set Schedule. Select the day you want to consider for that schedule, click Continue. If you choose Do Not Set Assessment Due Dates, the system will not automatically assign any due dates. You will need to manually set them later in the Assessment Setting view. If you choose Set Assessment Due Dates According to the Sequence of Course Content, due dates will align with where each assessment appears within a unit. For example, if an assessment is placed halfway through a unit, its due date will also be scheduled halfway through that unit's duration. If you choose Set Assessment Due Dates to the End of Each Section, all assessments will be due at the end of their respective units. So even if an assessment appears midway through that unit, its due date will still be at the end of that unit. This option is the most commonly used. Now you will see a Gantt-style timeline. Use Control plus minus or Command plus minus to adjust the size of the content on the screen for the best view. You can view or hide details of a unit by clicking the small black button or the Expand All/Collapse All button. Length of each block represent the suggested time duration of the unit, which is independent of assessment dates you set. They are interactive and fully adjustable, meaning that you can move it or drag the ends to change when a unit begins or ends. You can also search for a specific module or topic using the search bar. By default, items under Unit are set to Suggested By Dates. Suggested By Date is for keeping students on track, for example, with their readings. While Due By Date is for scored/graded objects. You can change one item's date into Hard Due Dates or In-Class Activity by clicking and editing them on the bottom left-hand corner of the screen. The item will then change to a calendar or group icon. You can also right-click a unit or item to remove it, adjust dates with numeric input given selected units or assessment item, or drag and reposition the task on the timeline. This gives you granular control over how students pace themselves. Remember to click Save Changes after you are done. If you want to preview the schedule from a student view, go back to the course Manage Settings. Click Preview as Student to see what your learners will see. Recent items will appear under Upcoming Agenda on the homepage, and the full schedule can be viewed on the Schedule page. And that's the Scheduling tool. Remember, you can change these settings at any time, even after the course has begun. In the next video, we'll walk through the Assessment Settings."
  },
  {
    title: "Configure Assessment Settings",
    category: "Instructor",
    section: "Scheduling and Assessment",
    page: "pages/schedule-and-assessment/assessment-setting.html",
    description: "Learn how to adjust scored-activity settings one by one or apply them in bulk.",
    keywords: ["assessment settings", "scored activities", "bulk apply", "attempts", "late policy", "targeted retake", "password", "exceptions", "due date"],
    transcript: "From the schedule and assessment setting page, go to the assessment settings tab. Here, you will see a list of scored activities. You can manage them one by one or in bulk. Let's look at settings for individual assessments first. Each activity includes multiple settings you can adjust regarding when and how students experience it. To do so, simply click and select or enter your changes. To mention a few tips, the time of date here follows the 24-hour system. Enabling targeted retake mode will allow students to only redo questions they got wrong. Also, passwords and exceptions will help set special access rules or accommodations for individual students. You can also use the search bar to search for specific assessment names. Now, let's look into the bulk apply function. With many assessments, managing one by one can be tedious. Bulk apply allows you to copy settings for one assessment and apply them to all the others, except for the available date and due date. For example, here I changed the number of attempts and late policy of the Getting Started assessment. All I need to do is to select it from the list, click bulk apply, and confirm. This applies your selected setting to all assessment at once. Really time-saving, right? There will be another video explaining student progress and insights. If you have additional questions, visit our OLI help page."
  },

  // === Instructor — Course Overview and Student Insights ===
  {
    title: "Student Insights under Course Overview",
    category: "Instructor",
    section: "Course Overview and Student Insights",
    page: "pages/course-overview-and-student-insights/overview-insights.html",
    description: "Learn how to use Overview and the Students tab to inspect roster, progress, and attempt history.",
    keywords: ["overview", "roster", "students tab", "progress", "proficiency", "attempt history", "common mistakes", "recommended actions"],
    transcript: "Click at the Overview tab at the top of your course dashboard. Here you can have an aerial view of your course pages, individual students, assessment scores, and recommended actions. If you navigate to the Students tab, it will give you a full roster of your enrolled students. You can use the search feature and progress and proficiency level to locate certain students or filter by student types on the right-hand side. For example, I want to see for those who have mostly completed the activities what their common mistakes are. Then, I can select progress greater or equal than 90% and proficiency medium and low. To view individual student insight, click on the student. You will have a more detailed information breakdown. Go to their Progress tab. You can then select or search for a specific page or activity. After you click on the page, you will see the student's attempt history. This includes number of attempts, when they started each attempt, and when they submitted it for scored activities. Click into one attempt to see the student's answers and how each response was evaluated. This view can help you identify where a student may have misunderstood a concept or whether they need support or additional attempts."
  },
  {
    title: "Monitor Student Progress and Insights",
    category: "Instructor",
    section: "Course Overview and Student Insights",
    page: "pages/course-overview-and-student-insights/insights-student-progress.html",
    description: "Learn how to review student progress, proficiency, and assessment performance in the Insights tab.",
    keywords: ["insights", "progress", "proficiency", "dashboard", "scored activities", "practice activities", "question breakdown", "survey results"],
    transcript: "From your course dashboard, click the Insights tab. This tab displays information about how students interact with your content and assessments. Under the Content tab, you will see student progress and proficiency levels organized by unit or module. This tells you in aggregate how far students have progressed in a given section and their overall proficiency. You can filter by searching unit names and selecting Student Progress or Student Proficiency. In the Learning Objectives section, you will find a proficiency breakdown organized by learning objectives. The displayed analysis is based on the learning objectives you set. If your course does not have learning objectives, no insights will appear. For example, this course contains four learning objectives. When you hover on the proficiency progress bar, the detailed data will show up for each objective. This breakdown helps you understand where students are excelling and where they might need extra support. You can also filter by module to check on specific parts of your course. Under Scored Activities and Practice Activities, you will see the assessment data of each unit on students' average scores, attempts and progress. For both of the activities tab, you can dig into one unit by clicking on it, and the questions breakdown would appear right below the table. This shows you how students are performing on each question, including attempts at incorrect answer patterns. Note that anything you change here will not be saved and updated to the course. Under the Surveys tab, you can click into the page to see survey results if your course includes surveys. This is a great place to check in on feedback or gather formative insights from your students."
  },
  {
    title: "Add co-instructors or TAs",
    category: "Instructor",
    section: "Course Overview and Student Insights",
    page: "pages/course-overview-and-student-insights/add-coinstructors.html",
    description: "Learn how to add co-instructors or TAs.",
    keywords: ["co-instructor", "TA", "teaching assistant", "instructor access", "permissions", "invite"],
    transcript: ""
  },
  {
    title: "Manage course - miscellaneous",
    category: "Instructor",
    section: "Course Overview and Student Insights",
    page: "pages/course-overview-and-student-insights/manage-miscellaneous.html",
    description: "Learn how to manage discussions, collaborative spaces, notes, and manual scoring.",
    keywords: ["discussions", "collaborative spaces", "notes", "manual scoring", "grade", "feedback", "manage"],
    transcript: "Manage course - miscellaneous: Hi, I’m Eadin from the Open Learning Initiative. In this video, I’ll show you some other settings you can play with to manage your course. The settings include course discussions, collaborative spaces, notes, and manual scoring. Let’s get started. Under the course’s Discussion Activities, you will find the details of student posts if your course involves any discussion. You can also filter to see 'Posts that Need Approval' and 'Posts Awaiting a Reply'. Going back to your course’s Manage tab, scroll down and you can find 'Browse Collaborative Spaces' next to Manage. If your course has a collaborative space, you may enter it here. Scroll down a little more, you can enable notes for your course. The notes are essentially a notebook for students within the course page. This allows students to annotate content for saving, and sharing within the class. Once enabled, it will apply to all pages in your course. Click OK to confirm. Lastly, you can also enter the manual scoring space here if your course involves activities to be graded manually. Click on manual scoring next to Scoring to see the list of activities. Select the one you want to score, and scroll down to see detailed student answers, and the place to enter your input. Note that aside from the score, you have to give some feedback in order to apply your scoring. Use the score short-cut button to save your time. Once you apply your score and feedback, the page will automatically jump to the next one in line. If you have additional questions, visit our OLI Help page."
  }
];
