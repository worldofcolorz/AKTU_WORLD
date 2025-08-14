// B.Tech → Universities → Years → Subjects → Notes; includes Quantum Books per subject

const BTECH = {
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
              name: 'Engineering Mathematics',
              notes: [
                { title: 'Unit-wise Notes', link: '#' },
                { title: 'Important Topics', link: '#' },
              ],
              quantumBooks: [
                { title: 'Mathematics Quantum', link: '#' },
              ],
            },
            {
              id: 'physics',
              name: 'Engineering Physics',
              notes: [
                { title: 'Chapter Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Physics Quantum', link: '#' },
              ],
            },
            {
              id: 'chemistry',
              name: 'Engineering Chemistry',
              notes: [
                { title: 'Chapter Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Chemistry Quantum', link: '#' },
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
              name: 'Data Structures',
              notes: [
                { title: 'Unit-wise Notes', link: '#' },
                { title: 'Important Topics', link: '#' },
              ],
              quantumBooks: [
                { title: 'Data Structures Quantum', link: '#' },
              ],
            },
            {
              id: 'digital_electronics',
              name: 'Digital Electronics',
              notes: [
                { title: 'Chapter Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Digital Electronics Quantum', link: '#' },
              ],
            },
          ],
        },
        {
          id: 'year3',
          name: '3rd Year',
          subjects: [
            {
              id: 'computer_networks',
              name: 'Computer Networks',
              notes: [
                { title: 'Unit-wise Notes', link: '#' },
                { title: 'Important Topics', link: '#' },
              ],
              quantumBooks: [
                { title: 'Computer Networks Quantum', link: '#' },
              ],
            },
            {
              id: 'database_systems',
              name: 'Database Systems',
              notes: [
                { title: 'Chapter Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Database Systems Quantum', link: '#' },
              ],
            },
          ],
        },
        {
          id: 'year4',
          name: '4th Year',
          subjects: [
            {
              id: 'software_engineering',
              name: 'Software Engineering',
              notes: [
                { title: 'Unit-wise Notes', link: '#' },
                { title: 'Important Topics', link: '#' },
              ],
              quantumBooks: [
                { title: 'Software Engineering Quantum', link: '#' },
              ],
            },
            {
              id: 'artificial_intelligence',
              name: 'Artificial Intelligence',
              notes: [
                { title: 'Chapter Notes', link: '#' },
              ],
              quantumBooks: [
                { title: 'Artificial Intelligence Quantum', link: '#' },
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

export default BTECH;


