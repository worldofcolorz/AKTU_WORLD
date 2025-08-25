// Study Materials - Entrance Exams section
// Contains JEE and NEET entrance exam materials

export const JEE = {
  id: 'jee',
  name: 'JEE',
  exams: [
    {
      id: 'mains',
      name: 'JEE Mains',
      subjects: [
        { id: 'physics', name: 'Physics', notes: [{ title: 'PYQ', link: '#' }] },
        { id: 'chemistry', name: 'Chemistry', notes: [{ title: 'PYQ', link: '#' }] },
        { id: 'mathematics', name: 'Mathematics', notes: [{ title: 'PYQ', link: '#' }] },
      ],
    },
    {
      id: 'advanced',
      name: 'JEE Advanced',
      subjects: [
        { id: 'physics', name: 'Physics', notes: [{ title: 'PYQ', link: '#' }] },
        { id: 'chemistry', name: 'Chemistry', notes: [{ title: 'PYQ', link: '#' }] },
        { id: 'mathematics', name: 'Mathematics', notes: [{ title: 'PYQ', link: '#' }] },
      ],
    },
  ],
}

export const NEET = {
  id: 'neet',
  name: 'NEET',
  subjects: [
    {
      id: 'physics',
      name: 'Physics',
      types: [
        {
          id: 'ncert',
          name: 'NCERT',
          classes: [
            { id: '11', name: 'Class 11', notes: [{ title: 'NCERT Class 11 Physics', link: '#' }] },
            { id: '12', name: 'Class 12', notes: [{ title: 'NCERT Class 12 Physics', link: '#' }] },
          ],
        },
        {
          id: 'exemplar',
          name: 'NCERT Exemplar',
          classes: [
            { id: '11', name: 'Class 11', notes: [{ title: 'Exemplar Class 11 Physics', link: '#' }] },
            { id: '12', name: 'Class 12', notes: [{ title: 'Exemplar Class 12 Physics', link: '#' }] },
          ],
        },
        { id: 'pyq', name: 'NEET PYQ', notes: [{ title: 'NEET Physics PYQ', link: '#' }] },
        { id: 'notes', name: 'Notes', notes: [{ title: 'NEET Physics Notes', link: '#' }] },
      ],
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      types: [
        {
          id: 'ncert',
          name: 'NCERT',
          classes: [
            { id: '11', name: 'Class 11', notes: [{ title: 'NCERT Class 11 Chemistry', link: '#' }] },
            { id: '12', name: 'Class 12', notes: [{ title: 'NCERT Class 12 Chemistry', link: '#' }] },
          ],
        },
        {
          id: 'exemplar',
          name: 'NCERT Exemplar',
          classes: [
            { id: '11', name: 'Class 11', notes: [{ title: 'Exemplar Class 11 Chemistry', link: '#' }] },
            { id: '12', name: 'Class 12', notes: [{ title: 'Exemplar Class 12 Chemistry', link: '#' }] },
          ],
        },
        { id: 'pyq', name: 'NEET PYQ', notes: [{ title: 'NEET Chemistry PYQ', link: '#' }] },
        { id: 'notes', name: 'Notes', notes: [{ title: 'NEET Chemistry Notes', link: '#' }] },
      ],
    },
    {
      id: 'biology',
      name: 'Biology',
      types: [
        {
          id: 'ncert',
          name: 'NCERT',
          classes: [
            { id: '11', name: 'Class 11', notes: [{ title: 'NCERT Class 11 Biology', link: '#' }] },
            { id: '12', name: 'Class 12', notes: [{ title: 'NCERT Class 12 Biology', link: '#' }] },
          ],
        },
        {
          id: 'exemplar',
          name: 'NCERT Exemplar',
          classes: [
            { id: '11', name: 'Class 11', notes: [{ title: 'Exemplar Class 11 Biology', link: '#' }] },
            { id: '12', name: 'Class 12', notes: [{ title: 'Exemplar Class 12 Biology', link: '#' }] },
          ],
        },
        { id: 'pyq', name: 'NEET PYQ', notes: [{ title: 'NEET Biology PYQ', link: '#' }] },
        { id: 'notes', name: 'Notes', notes: [{ title: 'NEET Biology Notes', link: '#' }] },
      ],
    },
  ],
}

export default { JEE, NEET }

