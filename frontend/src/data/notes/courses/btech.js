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
            { id: 'ai_for_engineering', name: 'AI for Engineering', notes: [{ title: 'Notes', link: '#' }], quantumBooks: [] },
            { id: 'basic_electrical_engineering', name: 'Basic of Electrical Engineering', notes: [{ title: 'Notes', link: '#' }], quantumBooks: [] },
            { id: 'emerging_electronics', name: 'Emerging Domain in Electronics Engineering', notes: [{ title: 'Notes', link: '#' }], quantumBooks: [] },
            { id: 'emerging_technology', name: 'Emerging Technology for Engineering', notes: [{ title: 'Notes', link: '#' }], quantumBooks: [] },
            { id: 'engineering_chemistry', name: 'Engineering Chemistry', notes: [{ title: 'Chapter Notes', link: '#' }], quantumBooks: [{ title: 'Chemistry Quantum', link: '#' }] },
            { id: 'engineering_math_1', name: 'Engineering Mathematics 1', notes: [{ title: 'Unit-wise Notes', link: '#' }], quantumBooks: [{ title: 'Mathematics Quantum', link: '#' }] },
            { id: 'engineering_math_2', name: 'Engineering Mathematics 2', notes: [{ title: 'Unit-wise Notes', link: '#' }], quantumBooks: [{ title: 'Mathematics Quantum', link: '#' }] },
            { id: 'engineering_physics', name: 'Engineering Physics', notes: [{ title: 'Chapter Notes', link: '#' }], quantumBooks: [{ title: 'Physics Quantum', link: '#' }] },
            { id: 'environment_ecology', name: 'Environment and Ecology', notes: [{ title: 'Notes', link: '#' }], quantumBooks: [] },
            { id: 'fundamentals_electrical', name: 'Fundamentals of Electrical Engineering', notes: [{ title: 'Notes', link: '#' }], quantumBooks: [] },
            { id: 'fundamentals_mechanical_mechatronics', name: 'Fundamentals of Mechanical Engineering and Mechatronics', notes: [{ title: 'Notes', link: '#' }], quantumBooks: [] },
            { id: 'human_values_ethics', name: 'Human values and professional ethics', notes: [{ title: 'Notes', link: '#' }], quantumBooks: [] },
            { id: 'programming_problem_solving', name: 'Programming for Problem Solving', notes: [{ title: 'Notes', link: '#' }], quantumBooks: [] },
            { id: 'soft_skills_1', name: 'Soft skill 1', notes: [{ title: 'Notes', link: '#' }], quantumBooks: [] },
            { id: 'soft_skills_2', name: 'Soft skills 2', notes: [{ title: 'Notes', link: '#' }], quantumBooks: [] },
            { id: 'soft_skills_bas205', name: 'Soft skills BAS205', notes: [{ title: 'Notes', link: '#' }], quantumBooks: [] },
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


