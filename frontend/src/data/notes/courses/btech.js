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
          ],
        },
      ],
    },
  ],
};

export default BTECH;


