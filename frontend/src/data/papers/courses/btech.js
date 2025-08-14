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
              id: 'ai_for_engineering',
              name: 'AI for Engineering',
              papers: [
                { year: '2022', link: 'https://drive.google.com/file/d/1aVI1RZAjVnN5QcWVxoz5jK0rnnS2Rb9_/view?usp=drive_link' },
                { year: '2023', link: '' },
              ],
            },
            {
              id: 'basic_electrical_engineering',
              name: 'Basic of Electrical Engineering',
              papers: [
                { year: '2021', link: 'https://drive.google.com/file/d/1yGReiKa-GFm60bruq28a495w6zUxv35z/view?usp=drive_link' },
                { year: '2022', link: 'https://drive.google.com/file/d/1Nsy5uDl2e0jNOYbfI4FIWJOFof7wALcp/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/1W38qWbnTnfMTh_UuyGOzJhdd98UMXknT/view?usp=drive_link' },
                { year: '2025', link: 'https://drive.google.com/file/d/12iiwy1UkwF1XSI1EVU3e5DSPqojOR4St/view?usp=drive_link' },
              ],
            },
            {
              id: 'emerging_electronics',
              name: 'Emerging Domain in Electronics Engineering',
              papers: [
                { year: '2021', link: 'https://drive.google.com/file/d/1_v80I3bGmhvHgqEbIn4wUZ5E0XIARM4W/view?usp=drive_link' },
                { year: '2022', link: 'https://drive.google.com/file/d/1i_PnbQzV-TnuE67rFMbP74vP-lAc6IPH/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/1m_ZctKJerviT0-cx8Jar_3N-jBDZcTap/view?usp=drive_link' },
                { year: '2025', link: 'https://drive.google.com/file/d/1jGuBo5MG6n1GtOTQVhf8KgJqNtpTSGnk/view?usp=drive_link' },
              ],
            },
            {
              id: 'emerging_technology',
              name: 'Emerging Technology for Engineering',
              papers: [
                { year: '2022', link: 'https://drive.google.com/file/d/1wyXXy6JKCoEGMVZ4bIPxq7jyJpU_4_5n/view?usp=drive_link' },
              ],
            },
            {
              id: 'engineering_chemistry',
              name: 'Engineering Chemistry',
              papers: [
                { year: '2021', link: 'https://drive.google.com/file/d/1pooJELWaC4tW9zCm5vTVxo2aqFX-O6Z5/view?usp=drive_link' },
                { year: '2022', link: 'https://drive.google.com/file/d/1y7t-Xx1DxTzpz925sGPNE98VZF-VQSyQ/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/1898OE4tbii6F7oYTDZKuTcYL-Q0rI3ZZ/view?usp=drive_link' },
                { year: '2024', link: 'https://drive.google.com/file/d/18FjxtECDJZUuHiEeCIJ-s7hJmQAlL5NT/view?usp=drive_link' },
                { year: '2025', link: 'https://drive.google.com/file/d/1mu4WJc3slseXV81VvZM0DYQ-BlGa0dMC/view?usp=drive_link' },
              ],
            },
            {
              id: 'engineering_math_1',
              name: 'Engineering Mathematics 1',
              papers: [
                { year: '2021', link: 'https://drive.google.com/file/d/1O7JZc5idICqzIir0yMbGCwWz7_g-4TGM/view?usp=drive_link' },
                { year: '2022', link: 'https://drive.google.com/file/d/1ucYa_OOoLeeQOzzbJk3I_ZVjXd9igbLw/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/1jOLG3m9gB3pryF-yCn_UYvusmOdeKlmL/view?usp=drive_link' },
                { year: '2025', link: 'https://drive.google.com/file/d/1sfy5RArE23tQTWi0Ev14Bvs91Shln6Ol/view?usp=drive_link' },
              ],
            },
            {
              id: 'engineering_math_2',
              name: 'Engineering Mathematics 2',
              papers: [
                { year: '2022', link: 'https://drive.google.com/file/d/1bAv16bmgt1IAQd6BWQUsExQ-ydtunDsg/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/1mqO7rlmV6_ldGHC1k8ds4dCSDyiDB4qO/view?usp=drive_link' },
                { year: '2024', link: 'https://drive.google.com/file/d/1h9jvuOMFCIXtTJYbYhk4plhB_NynHUgA/view?usp=drive_link' },
              ],
            },
            {
              id: 'engineering_physics',
              name: 'Engineering Physics',
              papers: [
                { year: '2021', link: 'https://drive.google.com/file/d/1s9jxxiYHmDLT831aJZcWbNOR1yuUs0yt/view?usp=drive_link' },
                { year: '2022', link: 'https://drive.google.com/file/d/146rLblQZBIZ1MyJiP9tGVH-1qc0d3VFt/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/14t2BKhnBcJmbLOvhTNe4Sp53qWwdx97p/view?usp=drive_link' },
                { year: '2024', link: 'https://drive.google.com/file/d/1UwrfL7heiIKnhxRO54LbbJsIFN2ou8YK/view?usp=drive_link' },
              ],
            },
            {
              id: 'environment_ecology',
              name: 'Environment and Ecology',
              papers: [
                { year: '2024', link: 'https://drive.google.com/file/d/1d_o5oc1tUlmbMmbd-wxMqUPyb3ae2EpG/view?usp=drive_link' },
              ],
            },
            {
              id: 'fundamentals_mechanical_mechatronics',
              name: 'Fundamentals of Mechanical Engineering and Mechatronics',
              papers: [
                { year: '2021', link: 'https://drive.google.com/file/d/1HVB4p1PnzfSndRzNs81U7cXjVvScEs7V/view?usp=drive_link' },
                { year: '2022', link: 'https://drive.google.com/file/d/1jdAEpRdLIrLS4hJne34AjgMiz8LcQGGk/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/1QXwwufcpuzEfuiERqJ-Efb2y4VllQyy0/view?usp=drive_link' },
                { year: '2025', link: 'https://drive.google.com/file/d/1N3t0XisVLQ12GPo5hDhZaCW-lVZ7XM7G/view?usp=drive_link' },
              ],
            },
            {
              id: 'human_values_ethics',
              name: 'Human values and professional ethics',
              papers: [
                { year: '2023', link: 'https://drive.google.com/file/d/1JPMPu9fwVtmjQthBRQ7kOw8HPG2GWAQN/view?usp=drive_link' },
              ],
            },
            {
              id: 'programming_problem_solving',
              name: 'Programming for Problem Solving',
              papers: [
                { year: '2021', link: 'https://drive.google.com/file/d/1cGrMXJ8L6LMQqWjt6EZTDlk39w-ABaaO/view?usp=drive_link' },
                { year: '2022', link: 'https://drive.google.com/file/d/1f4Wg_l5WkyLSszUasbvw29jtnMZFC1c2/view?usp=drive_link' },
                { year: '2024', link: 'https://drive.google.com/file/d/1FIhcWwz7YRWMVCo-ATrej15GJbBvWlz8/view?usp=drive_link' },
              ],
            },
            {
              id: 'soft_skills_1',
              name: 'Soft skill 1',
              papers: [
                { year: '2021', link: 'https://drive.google.com/file/d/13iEdsGRi72twiFqa3TNlOKRVCuC5sV0g/view?usp=drive_link' },
                { year: '2022', link: 'https://drive.google.com/file/d/15XyqmMmdZ0os4Knb-TrFli0rpDMSRejb/view?usp=drive_link' },
                { year: '2025', link: 'https://drive.google.com/file/d/17I2vS7PjSzna-513FSfb5LKsP3XNoY5Q/view?usp=drive_link' },
              ],
            },
            {
              id: 'soft_skills_2',
              name: 'Soft skills 2',
              papers: [
                { year: '2022', link: 'https://drive.google.com/file/d/1AMFSqF2B1w5v70PfffP26gHY_NCyrvAj/view?usp=drive_link' },
              ],
            },
            {
              id: 'soft_skills_bas205',
              name: 'Soft skills BAS205',
              papers: [
                { year: '2023', link: 'https://drive.google.com/file/d/12K1L432N0umavjHf7hgRf32Xd76VLzV_/view?usp=drive_link' },
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


