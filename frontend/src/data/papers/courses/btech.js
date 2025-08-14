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
            { id: 'ai_for_engineering', name: 'AI for Engineering', papers: [] },
            { id: 'basic_electrical_engineering', name: 'Basic of Electrical Engineering', papers: [] },
            { id: 'emerging_electronics', name: 'Emerging Domain in Electronics Engineering', papers: [] },
            { id: 'emerging_technology', name: 'Emerging Technology for Engineering', papers: [] },
            { id: 'engineering_chemistry', name: 'Engineering Chemistry', papers: [] },
            { id: 'engineering_math_1', name: 'Engineering Mathematics 1', papers: [] },
            { id: 'engineering_math_2', name: 'Engineering Mathematics 2', papers: [] },
            { id: 'engineering_physics', name: 'Engineering Physics', papers: [] },
            { id: 'environment_ecology', name: 'Environment and Ecology', papers: [] },
            { id: 'fundamentals_electrical', name: 'Fundamentals of Electrical Engineering', papers: [] },
            { id: 'fundamentals_mechanical_mechatronics', name: 'Fundamentals of Mechanical Engineering and Mechatronics', papers: [] },
            { id: 'human_values_ethics', name: 'Human values and professional ethics', papers: [] },
            { id: 'programming_problem_solving', name: 'Programming for Problem Solving', papers: [] },
            { id: 'soft_skills_1', name: 'Soft skill 1', papers: [] },
            { id: 'soft_skills_2', name: 'Soft skills 2', papers: [] },
            { id: 'soft_skills_bas205', name: 'Soft skills BAS205', papers: [] },
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


