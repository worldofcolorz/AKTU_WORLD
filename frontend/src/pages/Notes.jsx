import React, { useMemo, useState } from 'react'
import './papers.css'

import { NOTES_SECTIONS } from '../data/notes/sections'
import { default as COURSE_LIST } from '../data/notes/courses/list'
import { BTECH as N_BTECH, BCA as N_BCA, MCA as N_MCA, BSC as N_BSC } from '../data/notes/courses'
import { CBSE as N_CBSE, ICSE as N_ICSE } from '../data/notes/boards'
import GOVERNMENT_NOTES from '../data/notes/government'

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
  const [currentStep, setCurrentStep] = useState(1)
  const [showQuantum, setShowQuantum] = useState(false)

  const totalSteps = useMemo(() => {
    if (selectedSection === 'courses') return 7 // Section, Course, University, Year, Subject, Type, Links
    if (selectedSection === 'cbse') {
      // Avoid referencing helper functions before initialization
      const cls = (N_CBSE?.classes || []).find(c => c.id === selectedClass)
      const hasStreams = !!cls?.streams
      return hasStreams ? 5 : 4 // Section, Class, (Stream), Subject, Links
    }
    if (selectedSection === 'icse') return 4 // Section, Class, Subject, Links
    if (selectedSection === 'government') return 4 // Section, Exam, Subject, Links
    return 1
  }, [selectedSection, selectedClass])

  const goto = (step) => setCurrentStep(step)
  const reset = () => {
    setSelectedSection(''); setSelectedCourse(''); setSelectedUniversity(''); setSelectedYear(''); setSelectedSubject(''); setSelectedClass(''); setSelectedStream(''); setSelectedExam(''); setShowQuantum(false); setCurrentStep(1)
  }

  const handleSection = (id) => { reset(); setSelectedSection(id); goto(2) }

  // Courses helpers
  const getUniversities = () => courseNotesMap[selectedCourse]?.universities || []
  const getYears = () => getUniversities().find(u => u.id === selectedUniversity)?.years || []
  const getSubjects = () => getYears().find(y => y.id === selectedYear)?.subjects || []
  const getSubject = () => getSubjects().find(s => s.id === selectedSubject)

  // Boards helpers
  const getBoard = () => (selectedSection === 'cbse' ? N_CBSE : N_ICSE)
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
            {selectedSection === 'cbse' && (<>
              {s === 1 && 'Section'}{s === 2 && 'Class'}{totalSteps === 5 && s === 3 && 'Stream'}{(totalSteps === 4 && s === 3) || (totalSteps === 5 && s === 4) ? 'Subject' : ''}{(totalSteps === 4 && s === 4) || (totalSteps === 5 && s === 5) ? 'Links' : ''}
            </>)}
            {selectedSection === 'icse' && (<>
              {s === 1 && 'Section'}{s === 2 && 'Class'}{s === 3 && 'Subject'}{s === 4 && 'Links'}
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
        {NOTES_SECTIONS.map(sec => (
          <div key={sec.id} className="option-card" onClick={() => handleSection(sec.id)}>
            <div className="option-icon">{sec.icon}</div>
            <h3>{sec.name}</h3>
            <p>{sec.description}</p>
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
            <p>Notes and Quantum books</p>
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
      <div className="options-grid">
        {getYears().map(y => (
          <div key={y.id} className="option-card" onClick={() => { setSelectedYear(y.id); setSelectedSubject(''); setShowQuantum(false); goto(5) }}>
            <div className="option-icon">📅</div>
            <h3>{y.name}</h3>
            <p>Notes and Quantum</p>
          </div>
        ))}
      </div>
    </div>
  )

  const SubjectSelect = () => (
    <div className="selection-container">
      <h2>Select Subject</h2>
      <div className="options-grid">
        {getSubjects().map(s => (
          <div key={s.id} className="option-card" onClick={() => { setSelectedSubject(s.id); goto(6) }}>
            <div className="option-icon">📖</div>
            <h3>{s.name}</h3>
            <p>{(s.notes?.length || 0) + (s.quantumBooks?.length || 0)} resources</p>
          </div>
        ))}
      </div>
    </div>
  )

  const TypeSelect = () => (
    <div className="selection-container">
      <h2>Choose Resource Type</h2>
      <div className="options-grid">
        <div className="option-card" onClick={() => { setShowQuantum(false); goto(7) }}>
          <div className="option-icon">📝</div>
          <h3>Notes</h3>
          <p>Topic-wise notes</p>
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
        <h2>{showQuantum ? 'Quantum Books' : 'Notes'}</h2>
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
  const BoardClassSelect = () => (
    <div className="selection-container">
      <h2>Select Class</h2>
      <div className="options-grid">
        {getClasses().map(cls => (
          <div key={cls.id} className="option-card" onClick={() => { setSelectedClass(cls.id); setSelectedStream(''); setSelectedSubject(''); goto(3) }}>
            <div className="option-icon">🏷️</div>
            <h3>{cls.name}</h3>
            <p>Available notes</p>
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
          <div key={stream.id} className="option-card" onClick={() => { setSelectedStream(stream.id); setSelectedSubject(''); goto(4) }}>
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
          <div key={s.id} className="option-card" onClick={() => { setSelectedSubject(s.id); goto(4) }}>
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
        <h2>Notes</h2>
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
            <p>Available notes</p>
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
        <h2>Notes</h2>
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
        <h1>Notes</h1>
        <p>Find course-wise notes and quantum books</p>
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

        {selectedSection === 'cbse' && (
          <>
            {currentStep === 2 && <BoardClassSelect />}
            {/* If class has streams, step 3 is Stream, else Subject */}
            {currentStep === 3 && (getStreams().length ? <BoardStreamSelect /> : <BoardSubjectSelect />)}
            {currentStep === 4 && (getStreams().length ? <BoardSubjectSelect /> : <BoardLinks />)}
            {currentStep === 5 && (getStreams().length ? <BoardLinks /> : null)}
          </>
        )}

        {selectedSection === 'icse' && (
          <>
            {currentStep === 2 && <BoardClassSelect />}
            {currentStep === 3 && <BoardSubjectSelect />}
            {currentStep === 4 && <BoardLinks />}
          </>
        )}

        {selectedSection === 'government' && (
          <>
            {currentStep === 2 && <ExamSelect />}
            {currentStep === 3 && <GovSubjectSelect />}
            {currentStep === 4 && <GovLinks />}
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


