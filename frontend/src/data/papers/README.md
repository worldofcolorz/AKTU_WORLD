# Papers Data Structure

This folder organizes papers by top-level sections so you can easily add/update links without hunting through code.

- courses/
  - list.js → list of courses (id, name)
  - btech.js → per-course data
  - bca.js
  - ... etc
- boards/
  - cbse.js → classes → subjects → papers
  - icse.js → classes → subjects → papers
- government/
  - index.js → list of exams → subjects → papers
- sections.js → top-level sections metadata (Courses, CBSE, ICSE, Government)

How to add a new paper link:
- Courses: open `courses/<course>.js`, find the university → year → subject, and add `{ year: 'YYYY', link: 'URL' }`.
- CBSE/ICSE: open the respective board file and add under the right class/subject.
- Government: open `government/index.js`, add under the right exam/subject.

These files are imported by `src/pages/Papers.jsx` and rendered automatically.
