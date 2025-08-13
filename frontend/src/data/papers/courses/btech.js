// B.Tech → Universities → Years → Subjects → Papers

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
              papers: [
                { year: '2024', link: 'https://example.com/aktu-btech-math-1st-year-2024.pdf' },
                { year: '2023', link: 'https://example.com/aktu-btech-math-1st-year-2023.pdf' },
                { year: '2022', link: 'https://example.com/aktu-btech-math-1st-year-2022.pdf' },
              ],
            },
            {
              id: 'physics',
              name: 'Engineering Physics',
              papers: [
                { year: '2024', link: 'https://example.com/aktu-btech-physics-1st-year-2024.pdf' },
                { year: '2023', link: 'https://example.com/aktu-btech-physics-1st-year-2023.pdf' },
              ],
            },
            {
              id: 'chemistry',
              name: 'Engineering Chemistry',
              papers: [
                { year: '2024', link: 'https://example.com/aktu-btech-chemistry-1st-year-2024.pdf' },
                { year: '2023', link: 'https://example.com/aktu-btech-chemistry-1st-year-2023.pdf' },
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
              papers: [
                { year: '2024', link: 'https://example.com/aktu-btech-ds-2nd-year-2024.pdf' },
                { year: '2023', link: 'https://example.com/aktu-btech-ds-2nd-year-2023.pdf' },
              ],
            },
            {
              id: 'digital_electronics',
              name: 'Digital Electronics',
              papers: [
                { year: '2024', link: 'https://example.com/aktu-btech-de-2nd-year-2024.pdf' },
                { year: '2023', link: 'https://example.com/aktu-btech-de-2nd-year-2023.pdf' },
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
              papers: [
                { year: '2024', link: 'https://example.com/aktu-btech-cn-3rd-year-2024.pdf' },
                { year: '2023', link: 'https://example.com/aktu-btech-cn-3rd-year-2023.pdf' },
              ],
            },
            {
              id: 'database_systems',
              name: 'Database Systems',
              papers: [
                { year: '2024', link: 'https://example.com/aktu-btech-db-3rd-year-2024.pdf' },
                { year: '2023', link: 'https://example.com/aktu-btech-db-3rd-year-2023.pdf' },
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
              papers: [
                { year: '2024', link: 'https://example.com/aktu-btech-se-4th-year-2024.pdf' },
                { year: '2023', link: 'https://example.com/aktu-btech-se-4th-year-2023.pdf' },
              ],
            },
            {
              id: 'artificial_intelligence',
              name: 'Artificial Intelligence',
              papers: [
                { year: '2024', link: 'https://example.com/aktu-btech-ai-4th-year-2024.pdf' },
                { year: '2023', link: 'https://example.com/aktu-btech-ai-4th-year-2023.pdf' },
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


