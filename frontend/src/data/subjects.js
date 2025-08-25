import { BTECH, BCA, MCA, BSC } from './study-materials/courses'
import { CBSE, ICSE } from './study-materials/boards'
import GOVERNMENT_NOTES from './study-materials/government'
import { CBSE as PAPERS_CBSE, ICSE as PAPERS_ICSE, UPBOARD as PAPERS_UPBOARD, JEE as PAPERS_JEE, NEET as PAPERS_NEET } from './papers/boards'

function countCourseSubjects(courseData) {
  if (!courseData || !Array.isArray(courseData.universities)) return 0
  let total = 0
  for (const uni of courseData.universities) {
    if (!uni?.years) continue
    for (const year of uni.years) {
      if (Array.isArray(year?.subjects)) total += year.subjects.length
    }
  }
  return total
}

function countCbseSubjects(cbse) {
  if (!cbse || !Array.isArray(cbse.classes)) return 0
  let total = 0
  for (const cls of cbse.classes) {
    if (Array.isArray(cls?.subjects)) total += cls.subjects.length
    if (Array.isArray(cls?.streams)) {
      for (const stream of cls.streams) {
        if (Array.isArray(stream?.subjects)) total += stream.subjects.length
      }
    }
  }
  return total
}

function countIcseSubjects(icse) {
  if (!icse || !Array.isArray(icse.classes)) return 0
  let total = 0
  for (const cls of icse.classes) {
    if (Array.isArray(cls?.subjects)) total += cls.subjects.length
  }
  return total
}

function countGovernmentSubjects(groups) {
  if (!Array.isArray(groups)) return 0
  let total = 0
  for (const g of groups) {
    if (Array.isArray(g?.subjects)) total += g.subjects.length
  }
  return total
}

// Entrance exams (papers) subject counters
function countEntranceSubjects(examData) {
  if (!examData || !Array.isArray(examData.subjects)) return 0
  return examData.subjects.length
}

export function getTotalSubjectsCount() {
  let total = 0
  total += countCourseSubjects(BTECH)
  total += countCourseSubjects(BCA)
  total += countCourseSubjects(MCA)
  total += countCourseSubjects(BSC)
  // Notes boards
  total += countCbseSubjects(CBSE)
  total += countIcseSubjects(ICSE)
  // Papers boards
  total += countCbseSubjects(PAPERS_CBSE)
  total += countIcseSubjects(PAPERS_ICSE)
  total += countCbseSubjects(PAPERS_UPBOARD)
  // Papers entrance exams
  total += countEntranceSubjects(PAPERS_JEE)
  total += countEntranceSubjects(PAPERS_NEET)
  total += countGovernmentSubjects(GOVERNMENT_NOTES)
  return total
}


