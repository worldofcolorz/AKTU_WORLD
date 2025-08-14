// Add your Google Drive resource links here. The counter on Home will use this.
// Example:
// {
//   category: 'Computer Science',
//   links: ['https://drive.google.com/your-file-1', 'https://drive.google.com/your-file-2']
// }

// Manual extras (optional). You can still add standalone Drive links here if needed.
export const driveResources = [
  { category: 'Notes', links: [] },
  { category: 'Previous Year Papers', links: [] },
  { category: 'Syllabus', links: [] },
]

import { BTECH as NOTES_BTECH, BCA as NOTES_BCA, MCA as NOTES_MCA, BSC as NOTES_BSC } from './notes/courses'
import { CBSE as NOTES_CBSE, ICSE as NOTES_ICSE } from './notes/boards'
import NOTES_GOV from './notes/government'

import { BTECH as PAPERS_BTECH, BCA as PAPERS_BCA, BCOM as PAPERS_BCOM, BPHARMA as PAPERS_BPHARMA, BSC as PAPERS_BSC, MTECH as PAPERS_MTECH, MBA as PAPERS_MBA, MCA as PAPERS_MCA, MPHARMA as PAPERS_MPHARMA, BBA as PAPERS_BBA } from './papers/courses'
import { CBSE as PAPERS_CBSE, ICSE as PAPERS_ICSE } from './papers/boards'
import PAPERS_GOV from './papers/government'

function isDriveLink(url) {
  if (!url || typeof url !== 'string') return false
  const lower = url.toLowerCase()
  return lower.includes('drive.google.com') || lower.includes('docs.google.com')
}

function countFromArrayOfLinks(linkItems) {
  if (!Array.isArray(linkItems)) return 0
  let total = 0
  for (const item of linkItems) {
    const link = typeof item === 'string' ? item : item?.link
    if (isDriveLink(link)) total += 1
  }
  return total
}

// Notes datasets
function countNotesCourses(course) {
  if (!course?.universities) return 0
  let total = 0
  for (const uni of course.universities) {
    for (const year of uni?.years || []) {
      for (const subject of year?.subjects || []) {
        total += countFromArrayOfLinks(subject?.notes)
        total += countFromArrayOfLinks(subject?.quantumBooks)
      }
    }
  }
  return total
}

function countNotesBoardsCbse(cbse) {
  if (!cbse?.classes) return 0
  let total = 0
  for (const cls of cbse.classes) {
    for (const subj of cls?.subjects || []) {
      total += countFromArrayOfLinks(subj?.notes)
    }
    for (const stream of cls?.streams || []) {
      for (const subj of stream?.subjects || []) {
        total += countFromArrayOfLinks(subj?.notes)
      }
    }
  }
  return total
}

function countNotesBoardsIcse(icse) {
  if (!icse?.classes) return 0
  let total = 0
  for (const cls of icse.classes) {
    for (const subj of cls?.subjects || []) {
      total += countFromArrayOfLinks(subj?.notes)
    }
  }
  return total
}

function countNotesGovernment(groups) {
  if (!Array.isArray(groups)) return 0
  let total = 0
  for (const g of groups) {
    for (const subj of g?.subjects || []) {
      total += countFromArrayOfLinks(subj?.notes)
    }
  }
  return total
}

// Papers datasets
function countPapersCourses(course) {
  if (!course?.universities) return 0
  let total = 0
  for (const uni of course.universities) {
    for (const year of uni?.years || []) {
      for (const subject of year?.subjects || []) {
        total += countFromArrayOfLinks(subject?.papers)
      }
    }
  }
  return total
}

function countPapersBoardsCbse(cbse) {
  if (!cbse?.classes) return 0
  let total = 0
  for (const cls of cbse.classes) {
    for (const subj of cls?.subjects || []) {
      total += countFromArrayOfLinks(subj?.papers)
    }
  }
  return total
}

function countPapersBoardsIcse(icse) {
  if (!icse?.classes) return 0
  let total = 0
  for (const cls of icse.classes) {
    for (const subj of cls?.subjects || []) {
      total += countFromArrayOfLinks(subj?.papers)
    }
  }
  return total
}

function countPapersGovernment(groups) {
  if (!Array.isArray(groups)) return 0
  let total = 0
  for (const g of groups) {
    for (const subj of g?.subjects || []) {
      total += countFromArrayOfLinks(subj?.papers)
    }
  }
  return total
}

export function getTotalResourceCount() {
  // Manual extras
  const manualCount = driveResources.reduce((sum, group) => sum + (group.links?.length || 0), 0)

  // Notes
  let total = 0
  total += countNotesCourses(NOTES_BTECH)
  total += countNotesCourses(NOTES_BCA)
  total += countNotesCourses(NOTES_MCA)
  total += countNotesCourses(NOTES_BSC)
  total += countNotesBoardsCbse(NOTES_CBSE)
  total += countNotesBoardsIcse(NOTES_ICSE)
  total += countNotesGovernment(NOTES_GOV)

  // Papers
  total += countPapersCourses(PAPERS_BTECH)
  total += countPapersCourses(PAPERS_BCA)
  total += countPapersCourses(PAPERS_BCOM)
  total += countPapersCourses(PAPERS_BPHARMA)
  total += countPapersCourses(PAPERS_BSC)
  total += countPapersCourses(PAPERS_MTECH)
  total += countPapersCourses(PAPERS_MBA)
  total += countPapersCourses(PAPERS_MCA)
  total += countPapersCourses(PAPERS_MPHARMA)
  total += countPapersCourses(PAPERS_BBA)
  total += countPapersBoardsCbse(PAPERS_CBSE)
  total += countPapersBoardsIcse(PAPERS_ICSE)
  total += countPapersGovernment(PAPERS_GOV)

  return total + manualCount
}


