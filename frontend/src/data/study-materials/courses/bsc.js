// Study Materials - B.Sc Course
// B.Sc → Universities → Years → Subjects → Notes; includes Quantum Books per subject

const BSC = {
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
              id: 'mathematics',
              name: 'Mathematics',
              notes: [
                { title: 'Calculus Notes', link: '#' },
                { title: 'Algebra Notes', link: '#' },
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
              id: 'statistics',
              name: 'Statistics',
              notes: [
                { title: 'Probability Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Statistics Quantum', link: '#' },
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
          ],
        },
      ],
    },
    { id: 'bbdu', name: 'BBD University, Lucknow', years: [] },
    { id: 'invertis', name: 'Invertis University, Bareilly', years: [] },
    { id: 'cu', name: 'Chandigarh University', years: [] },
  ],
};

export default BSC;
