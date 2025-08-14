const MCA = {
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
              id: 'advanced_programming',
              name: 'Advanced Programming',
              notes: [
                { title: 'Java Notes', link: '#' },
                { title: 'Python Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Advanced Programming Quantum', link: '#' },
              ],
            },
          ],
        },
        {
          id: 'year2',
          name: '2nd Year',
          subjects: [
            {
              id: 'data_structures',
              name: 'Advanced Data Structures',
              notes: [
                { title: 'Algorithm Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Data Structures Quantum', link: '#' },
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

export default MCA;


