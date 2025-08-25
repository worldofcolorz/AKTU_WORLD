import React, { useMemo, useState } from 'react'
import './papers.css'

import { STUDY_MATERIALS_SECTIONS } from '../data/study-materials/sections'
import { default as COURSE_LIST } from '../data/study-materials/courses/list'
import { BTECH as N_BTECH, BCA as N_BCA, MCA as N_MCA, BSC as N_BSC } from '../data/study-materials/courses'
import { CBSE as N_CBSE, ICSE as N_ICSE } from '../data/study-materials/boards'
import { JEE as E_JEE, NEET as E_NEET } from '../data/study-materials/entrance'
import GOVERNMENT_NOTES from '../data/study-materials/government'

const courseNotesMap = {
  btech: N_BTECH,
  bca: N_BCA,
  mca: N_MCA,
  bsc: N_BSC,
}

function Notes() {
  const [selectedSection, setSelectedSection] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedUniversity, setSelectedUniversity] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedStream, setSelectedStream] = useState('')
  const [selectedExam, setSelectedExam] = useState('')
  const [selectedBoard, setSelectedBoard] = useState('')
  const [selectedEntranceExam, setSelectedEntranceExam] = useState('')
  const [selectedEntranceSubject, setSelectedEntranceSubject] = useState('')
  const [selectedEntranceType, setSelectedEntranceType] = useState('')
  const [selectedEntranceClass, setSelectedEntranceClass] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [showQuantum, setShowQuantum] = useState(false)

  const totalSteps = useMemo(() => {
    if (selectedSection === 'courses') return 7 // Section, Course, University, Year, Subject, Type, Links
    if (selectedSection === 'boards') {
      // Avoid referencing helpers before initialization
      const board = selectedBoard === 'cbse' ? N_CBSE : (selectedBoard === 'icse' ? N_ICSE : null)
      const cls = (board?.classes || []).find(c => c.id === selectedClass)
      const hasStreams = !!cls?.streams
      return hasStreams ? 6 : 5
    }
    if (selectedSection === 'jee') return 4 // Section, Exam, Subject, Links
    if (selectedSection === 'neet') {
      // Section, Subject, Type, [Class], Links
      const subj = (E_NEET?.subjects || []).find(s => s.id === selectedEntranceSubject)
      const types = subj?.types || []
      const t = types.find(tp => tp.id === selectedEntranceType)
      const hasClasses = !!t?.classes
      return hasClasses ? 5 : 4
    }
    if (selectedSection === 'government') return 4 // Section, Exam, Subject, Links
    return 1
  }, [selectedSection, selectedClass, selectedBoard, selectedEntranceSubject, selectedEntranceType])

  const goto = (step) => setCurrentStep(step)
  const reset = () => {
    setSelectedSection(''); setSelectedCourse(''); setSelectedUniversity(''); setSelectedYear(''); setSelectedSubject(''); setSelectedClass(''); setSelectedStream(''); setSelectedExam(''); setSelectedBoard(''); setSelectedEntranceExam(''); setSelectedEntranceSubject(''); setSelectedEntranceType(''); setSelectedEntranceClass(''); setShowQuantum(false); setCurrentStep(1)
  }

  const handleSection = (id) => { reset(); setSelectedSection(id); goto(2) }

  // Courses helpers
  const getUniversities = () => courseNotesMap[selectedCourse]?.universities || []
  const getYears = () => getUniversities().find(u => u.id === selectedUniversity)?.years || []
  const getSubjects = () => getYears().find(y => y.id === selectedYear)?.subjects || []
  const getSubject = () => getSubjects().find(s => s.id === selectedSubject)

  // Boards helpers (CBSE/ICSE unified under 'boards')
  const getBoard = () => {
    if (selectedBoard === 'cbse') return N_CBSE
    if (selectedBoard === 'icse') return N_ICSE
    return null
  }
  const getClasses = () => getBoard()?.classes || []
  const getBoardClass = () => getClasses().find(c => c.id === selectedClass)
  const getStreams = () => getBoardClass()?.streams || []
  const getBoardSubjects = () => {
    const cls = getBoardClass()
    if (!cls) return []
    if (cls.streams) {
      const stream = cls.streams.find(s => s.id === selectedStream)
      return stream?.subjects || []
    }
    return cls.subjects || []
  }
  const getBoardSubject = () => getBoardSubjects().find(s => s.id === selectedSubject)

  // Government helpers
  const getExams = () => GOVERNMENT_NOTES
  const getGovSubjects = () => getExams().find(e => e.id === selectedExam)?.subjects || []
  const getGovSubject = () => getGovSubjects().find(s => s.id === selectedSubject)

  // Entrance (JEE/NEET) helpers
  const getEntranceData = () => (selectedSection === 'jee' ? E_JEE : E_NEET)
  const getEntranceExams = () => getEntranceData()?.exams || []
  const getEntranceExam = () => getEntranceExams().find(e => e.id === selectedEntranceExam)
  const getEntranceSubjects = () => {
    if (selectedSection === 'jee') return getEntranceExam()?.subjects || []
    return getEntranceData()?.subjects || [] // NEET
  }
  const getEntranceSubject = () => getEntranceSubjects().find(s => s.id === selectedEntranceSubject)

  // NEET-specific helpers
  const getNEETSubjects = () => (E_NEET?.subjects || [])
  const getNEETSubject = () => getNEETSubjects().find(s => s.id === selectedEntranceSubject)
  const getNEETTypes = () => getNEETSubject()?.types || []
  const getNEETType = () => getNEETTypes().find(t => t.id === selectedEntranceType)
  const getNEETClasses = () => getNEETType()?.classes || []

  const handleOpen = (link) => window.open(link, '_blank')

  const Stepper = () => (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
        <div key={s} className={`step ${currentStep >= s ? 'active' : ''}`}>
          <div className="step-number">{s}</div>
          <div className="step-label">
            {selectedSection === 'courses' && (<>
              {s === 1 && 'Section'}{s === 2 && 'Course'}{s === 3 && 'University'}{s === 4 && 'Year'}{s === 5 && 'Subject'}{s === 6 && 'Type'}{s === 7 && 'Links'}
            </>)}
            {selectedSection === 'boards' && (<>
              {s === 1 && 'Section'}
              {s === 2 && 'Board'}
              {s === 3 && 'Class'}
              {(totalSteps === 6 && s === 4) && 'Stream'}
              {((totalSteps === 5 && s === 4) || (totalSteps === 6 && s === 5)) && 'Subject'}
              {((totalSteps === 5 && s === 5) || (totalSteps === 6 && s === 6)) && 'Links'}
            </>)}
            {selectedSection === 'jee' && (<>
              {s === 1 && 'Section'}{s === 2 && 'Exam'}{s === 3 && 'Subject'}{s === 4 && 'Links'}
            </>)}
            {selectedSection === 'neet' && (<>
              {s === 1 && 'Section'}
              {s === 2 && 'Subject'}
              {s === 3 && 'Type'}
              {(totalSteps === 5 && s === 4) && 'Class'}
              {((totalSteps === 4 && s === 4) || (totalSteps === 5 && s === 5)) && 'Links'}
            </>)}
            {selectedSection === 'government' && (<>
              {s === 1 && 'Section'}{s === 2 && 'Exam'}{s === 3 && 'Subject'}{s === 4 && 'Links'}
            </>)}
            {!selectedSection && s === 1 && 'Section'}
          </div>
        </div>
      ))}
    </div>
  )

  const SectionSelect = () => (
    <div className="selection-container">
      <h2>Select Section</h2>
      <div className="options-grid">
        {STUDY_MATERIALS_SECTIONS.map(section => (
          <div key={section.id} className="option-card" onClick={() => handleSection(section.id)}>
            <div className="option-icon">{section.icon}</div>
            <h3>{section.name}</h3>
            <p>{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  )

  // Courses renders
  const CourseSelect = () => (
    <div className="selection-container">
      <h2>Select Course</h2>
      <div className="options-grid">
        {COURSE_LIST.map(c => (
          <div key={c.id} className="option-card" onClick={() => { setSelectedCourse(c.id); setSelectedUniversity(''); setSelectedYear(''); setSelectedSubject(''); setShowQuantum(false); goto(3) }}>
            <div className="option-icon">🎓</div>
            <h3>{c.name}</h3>
            <p>Study Materials and Quantum Books</p>
          </div>
        ))}
      </div>
    </div>
  )

  const UniversitySelect = () => (
    <div className="selection-container">
      <h2>Select Your University</h2>
      <div className="dropdown">
        <label htmlFor="universitySelect" className="dropdown-label">University</label>
        <select id="universitySelect" className="dropdown-select" value={selectedUniversity} onChange={(e) => { setSelectedUniversity(e.target.value); setSelectedYear(''); setSelectedSubject(''); setShowQuantum(false); goto(4) }}>
          <option value="" disabled>Choose a university…</option>
          {getUniversities().map(u => (<option key={u.id} value={u.id}>{u.name}</option>))}
        </select>
        <p className="dropdown-hint">Use the arrow to open and scroll.</p>
      </div>
    </div>
  )

  const YearSelect = () => (
    <div className="selection-container">
      <h2>Select Year</h2>
      <div className="dropdown">
        <label htmlFor="yearSelect" className="dropdown-label">Year</label>
        <select
          id="yearSelect"
          className="dropdown-select"
          value={selectedYear}
          onChange={(e) => { setSelectedYear(e.target.value); setSelectedSubject(''); setShowQuantum(false); goto(5) }}
        >
          <option value="" disabled>Choose a year…</option>
          {getYears().map(y => (
            <option key={y.id} value={y.id}>{y.name}</option>
          ))}
        </select>
        <p className="dropdown-hint">Use the arrow to open and scroll.</p>
      </div>
    </div>
  )

  const SubjectSelect = () => (
    <div className="selection-container">
      <h2>Select Subject</h2>
      <div className="dropdown">
        <label htmlFor="subjectSelect" className="dropdown-label">Subject</label>
        <select
          id="subjectSelect"
          className="dropdown-select"
          value={selectedSubject}
          onChange={(e) => { setSelectedSubject(e.target.value); goto(6) }}
        >
          <option value="" disabled>Choose a subject…</option>
          {getSubjects().map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <p className="dropdown-hint">Use the arrow to open and scroll.</p>
      </div>
    </div>
  )

  const TypeSelect = () => (
    <div className="selection-container">
      <h2>Choose Resource Type</h2>
      <div className="options-grid">
        <div className="option-card" onClick={() => { setShowQuantum(false); goto(7) }}>
          <div className="option-icon">📝</div>
          <h3>Study Materials</h3>
          <p>Topic-wise study materials</p>
        </div>
        <div className="option-card" onClick={() => { setShowQuantum(true); goto(7) }}>
          <div className="option-icon">📘</div>
          <h3>Quantum Books</h3>
          <p>Quick revision guides</p>
        </div>
      </div>
    </div>
  )

  const LinksList = () => {
    const subj = getSubject()
    if (!subj) return null
    const items = showQuantum ? (subj.quantumBooks || []) : (subj.notes || [])
    return (
      <div className="papers-container">
        <h2>{showQuantum ? 'Quantum Books' : 'Study Materials'}</h2>
        <div className="papers-grid">
          {items.map((it, idx) => (
            <div key={idx} className="paper-card" onClick={() => handleOpen(it.link)}>
              <div className="paper-icon">{showQuantum ? '📘' : '📝'}</div>
              <h3>{it.title}</h3>
              <p>Open resource</p>
              <div className="paper-link"><span>Open in new tab</span><span className="arrow">→</span></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Boards
  const BoardSelect = () => (
    <div className="selection-container">
      <h2>Select Board</h2>
      <div className="options-grid">
        <div className="option-card" onClick={() => { setSelectedBoard('cbse'); setSelectedClass(''); setSelectedStream(''); setSelectedSubject(''); goto(3) }}>
          <div className="option-icon">🏫</div>
          <h3>CBSE</h3>
          <p>Central Board of Secondary Education</p>
        </div>
        <div className="option-card" onClick={() => { setSelectedBoard('icse'); setSelectedClass(''); setSelectedStream(''); setSelectedSubject(''); goto(3) }}>
          <div className="option-icon">🏛️</div>
          <h3>ICSE</h3>
          <p>Indian Certificate of Secondary Education</p>
        </div>
      </div>
    </div>
  )
  const BoardClassSelect = () => (
    <div className="selection-container">
      <h2>Select Class</h2>
      <div className="options-grid">
        {getClasses().map(cls => (
          <div key={cls.id} className="option-card" onClick={() => { setSelectedClass(cls.id); setSelectedStream(''); setSelectedSubject(''); goto(4) }}>
            <div className="option-icon">🏷️</div>
            <h3>{cls.name}</h3>
            <p>Available study materials</p>
          </div>
        ))}
      </div>
    </div>
  )

  const BoardStreamSelect = () => (
    <div className="selection-container">
      <h2>Select Stream</h2>
      <div className="options-grid">
        {getStreams().map(stream => (
          <div key={stream.id} className="option-card" onClick={() => { setSelectedStream(stream.id); setSelectedSubject(''); goto(5) }}>
            <div className="option-icon">🧭</div>
            <h3>{stream.name}</h3>
            <p>Choose a stream</p>
          </div>
        ))}
      </div>
    </div>
  )

  const BoardSubjectSelect = () => (
    <div className="selection-container">
      <h2>Select Subject</h2>
      <div className="options-grid">
        {getBoardSubjects().map(s => (
          <div key={s.id} className="option-card" onClick={() => { setSelectedSubject(s.id); goto(getStreams().length ? 6 : 5) }}>
            <div className="option-icon">📖</div>
            <h3>{s.name}</h3>
            <p>{(s.notes?.length || 0)} resources</p>
          </div>
        ))}
      </div>
    </div>
  )

  const BoardLinks = () => {
    const subj = getBoardSubject()
    if (!subj) return null
    const items = subj.notes || []
    return (
      <div className="papers-container">
        <h2>Study Materials</h2>
        <div className="papers-grid">
          {items.map((it, idx) => (
            <div key={idx} className="paper-card" onClick={() => handleOpen(it.link)}>
              <div className="paper-icon">📝</div>
              <h3>{it.title}</h3>
              <p>Open resource</p>
              <div className="paper-link"><span>Open in new tab</span><span className="arrow">→</span></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Entrance (JEE/NEET)
  const EntranceExamSelect = () => (
    <div className="selection-container">
      <h2>Select Exam (JEE)</h2>
      <div className="options-grid">
        {getEntranceExams().map(ex => (
          <div key={ex.id} className="option-card" onClick={() => { setSelectedEntranceExam(ex.id); setSelectedEntranceSubject(''); goto(3) }}>
            <div className="option-icon">🎯</div>
            <h3>{ex.name}</h3>
            <p>Choose exam</p>
          </div>
        ))}
      </div>
    </div>
  )

  const EntranceSubjectSelect = () => (
    <div className="selection-container">
      <h2>Select Subject</h2>
      <div className="dropdown">
        <label htmlFor="entranceSubjectSelectNotes" className="dropdown-label">Subject</label>
        <select
          id="entranceSubjectSelectNotes"
          className="dropdown-select"
          value={selectedEntranceSubject}
          onChange={(e) => { setSelectedEntranceSubject(e.target.value); setSelectedEntranceType(''); setSelectedEntranceClass(''); goto(selectedSection === 'jee' ? 4 : 3) }}
        >
          <option value="" disabled>Choose a subject…</option>
          {getEntranceSubjects().map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <p className="dropdown-hint">Use the arrow to open and scroll.</p>
      </div>
    </div>
  )

  const EntranceLinks = () => {
    const subj = getEntranceSubject()
    if (!subj) return null
    const items = subj.notes || []
    return (
      <div className="papers-container">
        <h2>Study Materials</h2>
        <div className="papers-grid">
          {items.map((it, idx) => (
            <div key={idx} className="paper-card" onClick={() => handleOpen(it.link)}>
              <div className="paper-icon">📝</div>
              <h3>{it.title}</h3>
              <p>Open resource</p>
              <div className="paper-link"><span>Open in new tab</span><span className="arrow">→</span></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // NEET Type/Class components
  const NeetTypeSelect = () => (
    <div className="selection-container">
      <h2>Choose Resource Type</h2>
      <div className="options-grid">
        {getNEETTypes().map(t => (
          <div key={t.id} className="option-card" onClick={() => { setSelectedEntranceType(t.id); setSelectedEntranceClass(''); goto(4) }}>
            <div className="option-icon">📚</div>
            <h3>{t.name}</h3>
            <p>{t.classes ? 'Select class next' : 'Open resources'}</p>
          </div>
        ))}
      </div>
    </div>
  )

  const NeetClassSelect = () => (
    <div className="selection-container">
      <h2>Select Class</h2>
      <div className="options-grid">
        {getNEETClasses().map(cls => (
          <div key={cls.id} className="option-card" onClick={() => { setSelectedEntranceClass(cls.id); goto(5) }}>
            <div className="option-icon">🏷️</div>
            <h3>{cls.name}</h3>
            <p>Available study materials</p>
          </div>
        ))}
      </div>
    </div>
  )

  const NeetLinks = () => {
    const type = getNEETType()
    if (!type) return null
    let items = []
    if (type.classes && type.classes.length) {
      const cls = (type.classes || []).find(c => c.id === selectedEntranceClass)
      items = cls?.notes || []
    } else {
      items = type.notes || []
    }
    return (
      <div className="papers-container">
        <h2>Study Materials</h2>
        <div className="papers-grid">
          {items.map((it, idx) => (
            <div key={idx} className="paper-card" onClick={() => handleOpen(it.link)}>
              <div className="paper-icon">📝</div>
              <h3>{it.title}</h3>
              <p>Open resource</p>
              <div className="paper-link"><span>Open in new tab</span><span className="arrow">→</span></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Government
  const ExamSelect = () => (
    <div className="selection-container">
      <h2>Select Exam</h2>
      <div className="options-grid">
        {getExams().map(ex => (
          <div key={ex.id} className="option-card" onClick={() => { setSelectedExam(ex.id); setSelectedSubject(''); goto(3) }}>
            <div className="option-icon">🏅</div>
            <h3>{ex.name}</h3>
            <p>Available study materials</p>
          </div>
        ))}
      </div>
    </div>
  )

  const GovSubjectSelect = () => (
    <div className="selection-container">
      <h2>Select Subject</h2>
      <div className="options-grid">
        {getGovSubjects().map(s => (
          <div key={s.id} className="option-card" onClick={() => { setSelectedSubject(s.id); goto(4) }}>
            <div className="option-icon">📖</div>
            <h3>{s.name}</h3>
            <p>{(s.notes?.length || 0)} resources</p>
          </div>
        ))}
      </div>
    </div>
  )

  const GovLinks = () => {
    const subj = getGovSubject()
    if (!subj) return null
    const items = subj.notes || []
    return (
      <div className="papers-container">
        <h2>Study Materials</h2>
        <div className="papers-grid">
          {items.map((it, idx) => (
            <div key={idx} className="paper-card" onClick={() => handleOpen(it.link)}>
              <div className="paper-icon">📝</div>
              <h3>{it.title}</h3>
              <p>Open resource</p>
              <div className="paper-link"><span>Open in new tab</span><span className="arrow">→</span></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="papers-page">
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>

      <div className="papers-header">
        <h1>Study Materials</h1>
        <p>Find course-wise study materials and quantum books</p>
      </div>

      <Stepper />

      <div className="papers-content">
        {currentStep === 1 && <SectionSelect />}

        {selectedSection === 'courses' && (
          <>
            {currentStep === 2 && <CourseSelect />}
            {currentStep === 3 && <UniversitySelect />}
            {currentStep === 4 && <YearSelect />}
            {currentStep === 5 && <SubjectSelect />}
            {currentStep === 6 && <TypeSelect />}
            {currentStep === 7 && <LinksList />}
          </>
        )}

        {selectedSection === 'boards' && (
          <>
            {currentStep === 2 && <BoardSelect />}
            {currentStep === 3 && <BoardClassSelect />}
            {currentStep === 4 && (getStreams().length ? <BoardStreamSelect /> : <BoardSubjectSelect />)}
            {currentStep === 5 && (getStreams().length ? <BoardSubjectSelect /> : <BoardLinks />)}
            {currentStep === 6 && (getStreams().length ? <BoardLinks /> : null)}
          </>
        )}

        {selectedSection === 'government' && (
          <>
            {currentStep === 2 && <ExamSelect />}
            {currentStep === 3 && <GovSubjectSelect />}
            {currentStep === 4 && <GovLinks />}
          </>
        )}

        {selectedSection === 'jee' && (
          <>
            {currentStep === 2 && <EntranceExamSelect />}
            {currentStep === 3 && <EntranceSubjectSelect />}
            {currentStep === 4 && <EntranceLinks />}
          </>
        )}
        {selectedSection === 'neet' && (
          <>
            {currentStep === 2 && <EntranceSubjectSelect />}
            {currentStep === 3 && <NeetTypeSelect />}
            {currentStep === 4 && (getNEETClasses().length ? <NeetClassSelect /> : <NeetLinks />)}
            {currentStep === 5 && (getNEETClasses().length ? <NeetLinks /> : null)}
          </>
        )}

        {currentStep > 1 && (
          <div className="navigation-buttons">
            <button className="back-btn" onClick={() => goto(Math.max(1, currentStep - 1))}>← Back</button>
            <button className="reset-btn" onClick={reset}>Start Over</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notes


