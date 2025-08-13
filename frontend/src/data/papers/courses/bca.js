// BCA → Universities → Years → Subjects → Papers

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
              papers: [
                { year: '2024', link: 'https://example.com/aktu-bca-programming-1st-year-2024.pdf' },
                { year: '2023', link: 'https://example.com/aktu-bca-programming-1st-year-2023.pdf' },
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
              papers: [
                { year: '2024', link: 'https://example.com/aktu-bca-web-2nd-year-2024.pdf' },
                { year: '2023', link: 'https://example.com/aktu-bca-web-2nd-year-2023.pdf' },
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
              papers: [
                { year: '2024', link: 'https://example.com/aktu-bca-project-3rd-year-2024.pdf' },
                { year: '2023', link: 'https://example.com/aktu-bca-project-3rd-year-2023.pdf' },
              ],
            },
          ],
        },
      ],
    },
    { id: 'bbdu', name: 'BBD University, Lucknow', years: [] },
  ],
};

export default BCA;


