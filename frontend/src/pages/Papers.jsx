import React, { useMemo, useState } from 'react';
import './papers.css';

import { PAPER_SECTIONS } from '../data/papers/sections';
import { default as COURSES_LIST } from '../data/papers/courses/list';
import { BTECH, BCA, MTECH, MCA, BPHARMA, MPHARMA, BBA, MBA, BSC, BCOM } from '../data/papers/courses';
import { CBSE, ICSE, JEE, NEET } from '../data/papers/boards';
import GOVERNMENT_EXAMS from '../data/papers/government';

const courseDataMap = {
  btech: BTECH,
  bca: BCA,
  mtech: MTECH,
  mca: MCA,
  bpharma: BPHARMA,
  mpharma: MPHARMA,
  bba: BBA,
  mba: MBA,
  bsc: BSC,
  bcom: BCOM,
};

const Papers = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedEntranceSubject, setSelectedEntranceSubject] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = useMemo(() => {
    if (selectedSection === 'courses') return 6; // Section, Course, University, Year, Subject, Papers
    if (selectedSection === 'boards') return 5; // Section, Board, Class, Subject, Papers
    if (selectedSection === 'jee' || selectedSection === 'neet') return 3; // Section, Subject, Papers
    if (selectedSection === 'government') return 4; // Section, Exam, Subject, Papers
    return 1; // Section only
  }, [selectedSection]);

  const goto = (step) => setCurrentStep(step);

  const resetSelection = () => {
    setSelectedSection('');
    setSelectedCourse('');
    setSelectedUniversity('');
    setSelectedYear('');
    setSelectedSubject('');
    setSelectedClass('');
    setSelectedExam('');
    setSelectedEntranceSubject('');
    setSelectedBoard('');
    setCurrentStep(1);
  };

  const handleSectionSelect = (sectionId) => {
    resetSelection();
    setSelectedSection(sectionId);
    goto(2);
  };

  // Courses helpers
  const getUniversities = () => {
    const course = courseDataMap[selectedCourse];
    return course?.universities || [];
  };

  const getYears = () => {
    const universities = getUniversities();
    const uni = universities.find((u) => u.id === selectedUniversity);
    return uni?.years || [];
  };

  const getSubjectsForCourse = () => {
    const years = getYears();
    const yr = years.find((y) => y.id === selectedYear);
    return yr?.subjects || [];
  };

  const getSelectedSubjectForCourse = () => {
    const list = getSubjectsForCourse();
    return list.find((s) => s.id === selectedSubject);
  };

  // Boards helpers
  const getBoardData = () => (selectedBoard === 'cbse' ? CBSE : ICSE);
  const getBoardClasses = () => getBoardData()?.classes || [];
  const getBoardSubjects = () => getBoardClasses().find((c) => c.id === selectedClass)?.subjects || [];
  const getSelectedBoardSubject = () => getBoardSubjects().find((s) => s.id === selectedSubject);

  // Government helpers
  const getExams = () => GOVERNMENT_EXAMS || [];
  const getGovernmentSubjects = () => getExams().find((e) => e.id === selectedExam)?.subjects || [];
  const getSelectedGovernmentSubject = () => getGovernmentSubjects().find((s) => s.id === selectedSubject);

  // Entrance (JEE/NEET) helpers
  const getEntranceData = () => (selectedSection === 'jee' ? JEE : NEET);
  const getEntranceSubjects = () => getEntranceData()?.subjects || [];
  const getSelectedEntranceSubject = () => getEntranceSubjects().find((s) => s.id === selectedEntranceSubject);

  const handlePaperClick = (link) => {
    window.open(link, '_blank');
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>
          <div className="step-number">{step}</div>
          <div className="step-label">
            {selectedSection === 'courses' && (
              <>
                {step === 1 && 'Section'}
                {step === 2 && 'Course'}
                {step === 3 && 'University'}
                {step === 4 && 'Year'}
                {step === 5 && 'Subject'}
                {step === 6 && 'Papers'}
              </>
            )}
            {selectedSection === 'boards' && (
              <>
                {step === 1 && 'Section'}
                {step === 2 && 'Board'}
                {step === 3 && 'Class'}
                {step === 4 && 'Subject'}
                {step === 5 && 'Papers'}
              </>
            )}
            {(selectedSection === 'jee' || selectedSection === 'neet') && (
              <>
                {step === 1 && 'Section'}
                {step === 2 && 'Subject'}
                {step === 3 && 'Papers'}
              </>
            )}
            {selectedSection === 'government' && (
              <>
                {step === 1 && 'Section'}
                {step === 2 && 'Exam'}
                {step === 3 && 'Subject'}
                {step === 4 && 'Papers'}
              </>
            )}
            {!selectedSection && step === 1 && 'Section'}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSectionSelection = () => (
    <div className="selection-container">
      <h2>Select Section</h2>
      <div className="options-grid">
        {PAPER_SECTIONS.map((s) => (
          <div key={s.id} className="option-card" onClick={() => handleSectionSelect(s.id)}>
            <div className="option-icon">{s.icon}</div>
            <h3>{s.name}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Courses renders
  const renderCourseSelection = () => (
    <div className="selection-container">
      <h2>Select Your Course</h2>
      <div className="options-grid">
        {COURSES_LIST.map((course) => (
          <div key={course.id} className="option-card" onClick={() => { setSelectedCourse(course.id); setSelectedUniversity(''); setSelectedYear(''); setSelectedSubject(''); goto(3); }}>
            <div className="option-icon">📚</div>
            <h3>{course.name}</h3>
            <p>Previous year papers for {course.name} students</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUniversitySelection = () => (
    <div className="selection-container">
      <h2>Select Your University</h2>
      <div className="dropdown">
        <label htmlFor="universitySelect" className="dropdown-label">University</label>
        <select
          id="universitySelect"
          className="dropdown-select"
          value={selectedUniversity}
          onChange={(e) => { setSelectedUniversity(e.target.value); setSelectedYear(''); setSelectedSubject(''); goto(4); }}
        >
          <option value="" disabled>Choose a university…</option>
          {getUniversities().map((university) => (
            <option key={university.id} value={university.id}>{university.name}</option>
          ))}
        </select>
        <p className="dropdown-hint">Tip: Use the arrow to open and scroll through the list.</p>
      </div>
    </div>
  );

  const renderYearSelection = () => (
    <div className="selection-container">
      <h2>Select Year</h2>
      <div className="dropdown">
        <label htmlFor="yearSelectPapers" className="dropdown-label">Year</label>
        <select
          id="yearSelectPapers"
          className="dropdown-select"
          value={selectedYear}
          onChange={(e) => { setSelectedYear(e.target.value); setSelectedSubject(''); goto(5); }}
        >
          <option value="" disabled>Choose a year…</option>
          {getYears().map((year) => (
            <option key={year.id} value={year.id}>{year.name}</option>
          ))}
        </select>
        <p className="dropdown-hint">Use the arrow to open and scroll.</p>
      </div>
    </div>
  );

  const renderCourseSubjectSelection = () => (
    <div className="selection-container">
      <h2>Select Subject</h2>
      <div className="dropdown">
        <label htmlFor="subjectSelectPapers" className="dropdown-label">Subject</label>
        <select
          id="subjectSelectPapers"
          className="dropdown-select"
          value={selectedSubject}
          onChange={(e) => { setSelectedSubject(e.target.value); goto(6); }}
        >
          <option value="" disabled>Choose a subject…</option>
          {getSubjectsForCourse().map((subject) => (
            <option key={subject.id} value={subject.id}>{subject.name}</option>
          ))}
        </select>
        <p className="dropdown-hint">Use the arrow to open and scroll.</p>
      </div>
    </div>
  );

  const renderCoursePapers = () => {
    const subject = getSelectedSubjectForCourse();
    if (!subject) return null;
    return (
      <div className="papers-container">
        <h2>{subject.name} - Previous Year Papers</h2>
        <div className="papers-grid">
          {subject.papers.map((paper, index) => (
            <div key={index} className="paper-card" onClick={() => handlePaperClick(paper.link)}>
              <div className="paper-icon">📄</div>
              <h3>{paper.year} Paper</h3>
              <p>Click to download/view</p>
              <div className="paper-link">
                <span>Open in new tab</span>
                <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Boards renders (CBSE/ICSE)
  const renderBoardSelection = () => (
    <div className="selection-container">
      <h2>Select Board</h2>
      <div className="options-grid">
        <div className="option-card" onClick={() => { setSelectedBoard('cbse'); setSelectedClass(''); setSelectedSubject(''); goto(3); }}>
          <div className="option-icon">🏫</div>
          <h3>CBSE</h3>
          <p>Central Board of Secondary Education papers</p>
        </div>
        <div className="option-card" onClick={() => { setSelectedBoard('icse'); setSelectedClass(''); setSelectedSubject(''); goto(3); }}>
          <div className="option-icon">🏛️</div>
          <h3>ICSE</h3>
          <p>Indian Certificate of Secondary Education papers</p>
        </div>
      </div>
    </div>
  );

  const renderBoardClassSelection = () => (
    <div className="selection-container">
      <h2>Select Class</h2>
      <div className="options-grid">
        {getBoardClasses().map((cls) => (
          <div key={cls.id} className="option-card" onClick={() => { setSelectedClass(cls.id); setSelectedSubject(''); goto(4); }}>
            <div className="option-icon">🏷️</div>
            <h3>{cls.name}</h3>
            <p>Previous year papers for {cls.name}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBoardSubjectSelection = () => (
    <div className="selection-container">
      <h2>Select Subject</h2>
      <div className="dropdown">
        <label htmlFor="boardSubjectSelect" className="dropdown-label">Subject</label>
        <select
          id="boardSubjectSelect"
          className="dropdown-select"
          value={selectedSubject}
          onChange={(e) => { setSelectedSubject(e.target.value); goto(5); }}
        >
          <option value="" disabled>Choose a subject…</option>
          {getBoardSubjects().map((subject) => (
            <option key={subject.id} value={subject.id}>{subject.name}</option>
          ))}
        </select>
        <p className="dropdown-hint">Use the arrow to open and scroll.</p>
      </div>
    </div>
  );

  const renderBoardPapers = () => {
    const subject = getSelectedBoardSubject();
    if (!subject) return null;
    return (
      <div className="papers-container">
        <h2>{subject.name} - Previous Year Papers</h2>
        <div className="papers-grid">
          {subject.papers.map((paper, index) => (
            <div key={index} className="paper-card" onClick={() => handlePaperClick(paper.link)}>
              <div className="paper-icon">📄</div>
              <h3>{paper.year} Paper</h3>
              <p>Click to download/view</p>
              <div className="paper-link">
                <span>Open in new tab</span>
                <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Government renders
  // Entrance renders (JEE/NEET)
  const renderEntranceSubjectSelection = () => (
    <div className="selection-container">
      <h2>Select Subject</h2>
      <div className="dropdown">
        <label htmlFor="entranceSubjectSelect" className="dropdown-label">Subject</label>
        <select
          id="entranceSubjectSelect"
          className="dropdown-select"
          value={selectedEntranceSubject}
          onChange={(e) => { setSelectedEntranceSubject(e.target.value); goto(3); }}
        >
          <option value="" disabled>Choose a subject…</option>
          {getEntranceSubjects().map((subject) => (
            <option key={subject.id} value={subject.id}>{subject.name}</option>
          ))}
        </select>
        <p className="dropdown-hint">Use the arrow to open and scroll.</p>
      </div>
    </div>
  );

  const renderEntrancePapers = () => {
    const subject = getSelectedEntranceSubject();
    if (!subject) return null;
    return (
      <div className="papers-container">
        <h2>{subject.name} - Previous Year Papers</h2>
        <div className="papers-grid">
          {subject.papers.map((paper, index) => (
            <div key={index} className="paper-card" onClick={() => handlePaperClick(paper.link)}>
              <div className="paper-icon">📄</div>
              <h3>{paper.year} Paper</h3>
              <p>Click to download/view</p>
              <div className="paper-link">
                <span>Open in new tab</span>
                <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderExamSelection = () => (
    <div className="selection-container">
      <h2>Select Exam</h2>
      <div className="options-grid">
        {getExams().map((exam) => (
          <div key={exam.id} className="option-card" onClick={() => { setSelectedExam(exam.id); setSelectedSubject(''); goto(3); }}>
            <div className="option-icon">🏅</div>
            <h3>{exam.name}</h3>
            <p>Previous year papers for {exam.name}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGovernmentSubjectSelection = () => (
    <div className="selection-container">
      <h2>Select Subject</h2>
      <div className="dropdown">
        <label htmlFor="govSubjectSelect" className="dropdown-label">Subject</label>
        <select
          id="govSubjectSelect"
          className="dropdown-select"
          value={selectedSubject}
          onChange={(e) => { setSelectedSubject(e.target.value); goto(4); }}
        >
          <option value="" disabled>Choose a subject…</option>
          {getGovernmentSubjects().map((subject) => (
            <option key={subject.id} value={subject.id}>{subject.name}</option>
          ))}
        </select>
        <p className="dropdown-hint">Use the arrow to open and scroll.</p>
      </div>
    </div>
  );

  const renderGovernmentPapers = () => {
    const subject = getSelectedGovernmentSubject();
    if (!subject) return null;
    return (
      <div className="papers-container">
        <h2>{subject.name} - Previous Year Papers</h2>
        <div className="papers-grid">
          {subject.papers.map((paper, index) => (
            <div key={index} className="paper-card" onClick={() => handlePaperClick(paper.link)}>
              <div className="paper-icon">📄</div>
              <h3>{paper.year} Paper</h3>
              <p>Click to download/view</p>
              <div className="paper-link">
                <span>Open in new tab</span>
                <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="papers-page">
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>

      <div className="papers-header">
        <h1>Previous Year Papers</h1>
        <p>Find and download previous year question papers</p>
      </div>

      {renderStepIndicator()}

      <div className="papers-content">
        {currentStep === 1 && renderSectionSelection()}

        {selectedSection === 'courses' && (
          <>
            {currentStep === 2 && renderCourseSelection()}
            {currentStep === 3 && renderUniversitySelection()}
            {currentStep === 4 && renderYearSelection()}
            {currentStep === 5 && renderCourseSubjectSelection()}
            {currentStep === 6 && renderCoursePapers()}
          </>
        )}

        {selectedSection === 'boards' && (
          <>
            {currentStep === 2 && renderBoardSelection()}
            {currentStep === 3 && renderBoardClassSelection()}
            {currentStep === 4 && renderBoardSubjectSelection()}
            {currentStep === 5 && renderBoardPapers()}
          </>
        )}

        {selectedSection === 'government' && (
          <>
            {currentStep === 2 && renderExamSelection()}
            {currentStep === 3 && renderGovernmentSubjectSelection()}
            {currentStep === 4 && renderGovernmentPapers()}
          </>
        )}

        {(selectedSection === 'jee' || selectedSection === 'neet') && (
          <>
            {currentStep === 2 && renderEntranceSubjectSelection()}
            {currentStep === 3 && renderEntrancePapers()}
          </>
        )}

        {currentStep > 1 && (
          <div className="navigation-buttons">
            <button className="back-btn" onClick={() => goto(Math.max(1, currentStep - 1))}>← Back</button>
            <button className="reset-btn" onClick={resetSelection}>Start Over</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Papers;


