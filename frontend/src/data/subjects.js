import { BTECH, BCA, MCA, BSC } from './notes/courses'
import { CBSE, ICSE } from './notes/boards'
import GOVERNMENT_NOTES from './notes/government'

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

export function getTotalSubjectsCount() {
  let total = 0
  total += countCourseSubjects(BTECH)
  total += countCourseSubjects(BCA)
  total += countCourseSubjects(MCA)
  total += countCourseSubjects(BSC)
  total += countCbseSubjects(CBSE)
  total += countIcseSubjects(ICSE)
  total += countGovernmentSubjects(GOVERNMENT_NOTES)
  return total
}


