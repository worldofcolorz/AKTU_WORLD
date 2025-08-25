// Study Materials - BCA Course
// BCA → Universities → Years → Subjects → Notes; includes Quantum Books per subject

const BCA = {
  universities: [
    {
      id: 'aktu',
      name: 'AKTU (Dr. A.P.J. Abdul Kalam Technical University)',
      years: [
        {
          id: 'year1',
          name: '1st Year',
          subjects: [
            {
              id: 'programming',
              name: 'Programming Fundamentals',
              notes: [
                { title: 'C Basics Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Programming Quantum', link: '#' },
              ],
            },
            {
              id: 'mathematics',
              name: 'Mathematics',
              notes: [
                { title: 'Chapter Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Mathematics Quantum', link: '#' },
              ],
            },
          ],
        },
        {
          id: 'year2',
          name: '2nd Year',
          subjects: [
            {
              id: 'web_development',
              name: 'Web Development',
              notes: [
                { title: 'HTML/CSS Notes', link: '#' },
                { title: 'JavaScript Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Web Development Quantum', link: '#' },
              ],
            },
            {
              id: 'database',
              name: 'Database Management',
              notes: [
                { title: 'SQL Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Database Quantum', link: '#' },
              ],
            },
          ],
        },
        {
          id: 'year3',
          name: '3rd Year',
          subjects: [
            {
              id: 'project_work',
              name: 'Project Work',
              notes: [
                { title: 'Project Guidelines', link: '#' },
              ],
              quantumBooks: [
                { title: 'Project Work Quantum', link: '#' },
              ],
            },
            {
              id: 'software_engineering',
              name: 'Software Engineering',
              notes: [
                { title: 'Chapter Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Software Engineering Quantum', link: '#' },
              ],
            },
          ],
        },
      ],
    },
    { id: 'bbdu', name: 'BBD University, Lucknow', years: [] },
    { id: 'invertis', name: 'Invertis University, Bareilly', years: [] },
    { id: 'cu', name: 'Chandigarh University', years: [] },
  ],
};

export default BCA;
