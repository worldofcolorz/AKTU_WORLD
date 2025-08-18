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
                { year: '2024', link: 'https://drive.google.com/file/d/1FIhcWwz7YRWMVCo-ATrej15GJbBvWlz8/view?usp=drive_link' }
              ],
            },
            {
              id: 'soft_skills_1',
              name: 'Soft skill 1',
              papers: [
                { year: '2021', link: 'https://drive.google.com/file/d/13iEdsGRi72twiFqa3TNlOKRVCuC5sV0g/view?usp=drive_link' },
                { year: '2022', link: 'https://drive.google.com/file/d/15XyqmMmdZ0os4Knb-TrFli0rpDMSRejb/view?usp=drive_link' },
                { year: '2025', link: 'https://drive.google.com/file/d/17I2vS7PjSzna-513FSfb5LKsP3XNoY5Q/view?usp=drive_link' }
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
            { id: 'computer_organization_architecture', name: 'Computer Organization and Architecture', papers: [{ year: '2019', link: 'https://drive.google.com/file/d/11ppZQAsfrXaJVO4sXreDVhHyAmj9_F0t/view?usp=drive_link' }, { year: '2020', link: 'https://drive.google.com/file/d/11lQrx4x1FohMNVXpa_YNWmUUtKLA63eF/view?usp=drive_link' },{ year: '2021', link: 'https://drive.google.com/file/d/11o9DGmQzPReRNng8QXbWu2h7T72BZ3zV/view?usp=drive_link' },{ year: '2022', link: 'https://drive.google.com/file/d/11mkhodv_R6zEeFkIFc27YoAzYwegr0P8/view?usp=drive_link' }] },
            { id: 'computer_system_security', name: 'Computer System Security', papers: [{ year: '2020', link: 'https://drive.google.com/file/d/12DQxBstMMYd_dSd60CcX21YIZd-Y5-br/view?usp=drive_link' }, { year: '2021', link: 'https://drive.google.com/file/d/12A8IeLCKK7kADtMAyBJnJZBIt_kann_b/view?usp=drive_link' },{ year: '2022', link: 'https://drive.google.com/file/d/12ARK9vQx3hmWCcKYTolqgIZub2MQg4rF/view?usp=drive_link' },{ year: '2023', link: 'https://drive.google.com/file/d/129Iie48a51QOYrbblF9pW9AtBjwNMsQs/view?usp=drive_link' }] },
            { id: 'data_structure', name: 'Data Structure', papers: [{ year: '2019', link: 'https://drive.google.com/file/d/12T7YDl49e39aebxcLJhEZ8X6IYPrafF_/view?usp=drive_link' }, { year: '2020', link: 'https://drive.google.com/file/d/12VqLLU1l86kjgwm5cy9bpZiKvmd862Y0/view?usp=drive_link' },{ year: '2021', link: 'https://drive.google.com/file/d/12Thsp7Et8ZBMg4qxR-AQd4iZACgnzUju/view?usp=drive_link' },{ year: '2022', link: 'https://drive.google.com/file/d/12VGx0ZvmU6L2jxiKiCuL8KkOHH65W_Ge/view?usp=drive_link' },{ year: '2023', link: 'https://drive.google.com/file/d/12YNh2ki_YZpy2Aa7TINMyon4SroJ0bkx/view?usp=drive_link' }] },
            { id: 'digital_electronics', name: 'Digital Electronics', papers: [{ year: '2022-sem3', link: 'https://drive.google.com/file/d/15ZeT9W3WLpKF7PZhBoxXMBvmzCInBDMu/view?usp=drive_link' }, { year: '2022-sem4', link: 'https://drive.google.com/file/d/15gtxlOxBAanYuP4SYf8-fWfXSIslnNQh/view?usp=drive_link' },{ year: '2023-sem3', link: 'https://drive.google.com/file/d/10DPVRerAJRQECDGJAUcYfV9p7N8BYb97/view?usp=drive_link' },{ year: '2023-sem4', link: 'https://drive.google.com/file/d/10Bzcbr4th6U1Gx6hByty5uWAOHA3jHnw/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/15YUwg32vpvDznZ9mHq7GH2hyXTAgBST4/view?usp=drive_link' }] },
            { id: 'discrete_structures_logic', name: 'Discrete Structures and Theory of Logic', papers: [{ year: '2020', link: 'https://drive.google.com/file/d/13SvmEJ5VPeWn9glnoR9vPuSnpYkXmdxl/view?usp=drive_link' }, { year: '2021', link: 'https://drive.google.com/file/d/13R8vK4sdeRjZzhPxE7nu6BLdaBbwx4c1/view?usp=drive_link' },{ year: '2022', link: 'https://drive.google.com/file/d/13NUFI_pQl3YJcICEUnAUHrybQH0xRdMO/view?usp=drive_link' },{ year: '2023', link: 'https://drive.google.com/file/d/13JKlocogKC9mTWp3bwejx6K_MKkU8eZI/view?usp=drive_link' }, { year: '2024', link: 'https://drive.google.com/file/d/13HFKGY5_tbt57l7KBBB4wDcPVIuLKW-P/view?usp=drive_link' },{ year: '2025', link: 'https://drive.google.com/file/d/13MV9cHi8vhnusdkQIAQ3gQpAdTsRyKNT/view?usp=drive_link' }] },
            { id: 'mathematics_iv', name: 'Mathematics IV', papers: [{ year: '2020', link: 'https://drive.google.com/file/d/15OOvnuX7BxzroeL7gSY9hHHmDm-OL5v1/view?usp=drive_link' }, { year: '2021', link: 'https://drive.google.com/file/d/15NmF97BnVrndvzSRhVUe4D-umt40gmGW/view?usp=drive_link' },{ year: '2022', link: 'https://drive.google.com/file/d/15SAecC6DaaB_LIPtL747qKZsGtZhQ540/view?usp=drive_link' },{ year: '2025', link : 'https://drive.google.com/file/d/15SQVUqxkxRevZolcbceRMOl2f-UqNRyU/view?usp=drive_link'}] },
            { id: 'operating_system', name: 'Operating System', papers: [{ year: '2016', link: 'https://drive.google.com/file/d/14d_JxCkGtsI-dtC508EJSumytO2iQTGU/view?usp=drive_link' }, { year: '2017', link: 'https://drive.google.com/file/d/146dKf6YU3c-RJWc2SaIE_m_11Wf1YLun/view?usp=drive_link' },{ year: '2018', link: 'https://drive.google.com/file/d/14PuGhFcY67bmwUfUUhiCbfJg6CcCCNJL/view?usp=drive_link' },{ year: '2021', link: 'https://drive.google.com/file/d/149K1m1FN6hxnHBiSXBZEsarxZA7NtxEx/view?usp=drive_link' }, { year: '2023', link: 'https://drive.google.com/file/d/14oXmp6rNb187LTFj7XcQMdrrs067alVW/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/14NE-lAl7f5S3nKGjgIMKQKbvC9KHwjY6/view?usp=drive_link' }] },
            { id: 'python_programming', name: 'Python Programming', papers: [{ year: '2019', link: 'https://drive.google.com/file/d/13cRRhGo3W1y-4qpTxABY4sXD2K-tStOa/view?usp=drive_link' }, { year: '2020', link: 'https://drive.google.com/file/d/13rirtiVI6KQKJgzVhpdHIs-sDXwgJ8M2/view?usp=drive_link' },{ year: '2021', link: 'https://drive.google.com/file/d/13_7J3KBlZzM44cDACcBGnDdQAcu2u24G/view?usp=drive_link' },{ year: '2022', link: 'https://drive.google.com/file/d/13XqreToQomg2p1tbp3yp5JivY_5CxUL_/view?usp=drive_link' }, { year: '2024', link: 'https://drive.google.com/file/d/13nBj_kUzZHuHsj6l5aqV3rKfniX5GP26/view?usp=drive_link' },{ year: '2025', link: 'https://drive.google.com/file/d/13xQB9g0NZQYYq2k-jXiO1Tg_EaU15arw/view?usp=drive_link' }] },
            { id: 'sensors_instrumentation', name: 'Sensors and Instrumentation', papers: [{ year: '2023', link: 'https://drive.google.com/file/d/10I8bsbClIeHpEe4b56K-WGHrotPrR4ri/view?usp=drive_link' }] },
            { id: 'technical_communication', name: 'Technical Communication', papers: [{ year: '2020', link: 'https://drive.google.com/file/d/14sFFlqQAFIHRhNOztLRodE6vI5feQ6Uo/view?usp=drive_link' }, { year: '2021', link: 'https://drive.google.com/file/d/15BixRG2Slbl3KjZFGIg8yK0D1w7ajiah/view?usp=drive_link' },{ year: '2022', link: 'https://drive.google.com/file/d/14zrIQDxBzkCBpB_7nmVSQ5O55wVFwj0I/view?usp=drive_link' },{ year: '2023', link: 'https://drive.google.com/file/d/154hHp9uIG924qp-a8egsNxkRUihaY0h8/view?usp=drive_link' }, { year: '2024', link: 'https://drive.google.com/file/d/14uChIZSTeTwRSiSkvFyL00XGC8bt1-3P/view?usp=drive_link' },{ year: '2025', link: 'https://drive.google.com/file/d/15AEMcgHlKwmlsBNPKHDAqQgTuORSIrhD/view?usp=drive_link' }] },
            { id: 'theory_automata_formal_languages', name: 'Theory of Automata and Formal Languages', papers: [{ year: '2016', link: 'https://drive.google.com/file/d/16BCueD3GPxuOtB2qNNtYrziGYlpcAJEb/view?usp=drive_link' }, { year: '2017', link: 'https://drive.google.com/file/d/16591EZI7Lbsm_wCnZIjeclE9G4Ov0Wv7/view?usp=drive_link' },{ year: '2018', link: 'https://drive.google.com/file/d/12m-gLkk1KdtTUR_gwm_Mv8ZEh54RfwZH/view?usp=drive_link' },{ year: '2021', link: 'https://drive.google.com/file/d/16GJC0-pdMBYpgB1P5ZSom6Sh-kvzeM3H/view?usp=drive_link' }, { year: '2022', link: 'https://drive.google.com/file/d/16FH-1rrAs4siA0lYFLcJ5b0HP9fsOXtx/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/16E90dcabmMhr18YQwgHkEeQJfgvqIJJY/view?usp=drive_link' }] },
            { id: 'universal_human_values_ethics', name: 'Universal Human Values and Professional Ethics', papers: [{ year: '2017', link: 'https://drive.google.com/file/d/12n42OnBF74L3SOT0yEcDBtAJLQzlqXvK/view?usp=drive_link' }, { year: '2018', link: 'https://drive.google.com/file/d/12xM5YiHIAbBNMAhRAOGsEG_P_uqtFXyK/view?usp=drive_link' },{ year: '2019', link: 'https://drive.google.com/file/d/13B0HfrDw-xGk367djISllxp7xW6p9ctZ/view?usp=drive_link' },{ year: '2021', link: 'https://drive.google.com/file/d/13EVyQ9THPVssdKs71joggAaCgFacdrOf/view?usp=drive_link' }, { year: '2022', link: 'https://drive.google.com/file/d/13-UlQwbMTKeIO4veGYtahIGSCZJ4cNNF/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/12mQjK6aB7_KtfrkPLreE2500kVryuGn9/view?usp=drive_link' }] },
            { id: 'web_designing', name: 'Web Designing', papers: [{ year: '2022', link: 'https://drive.google.com/file/d/10KR2SAuit8CmfPVpX5C4stRohGPqbrKC/view?usp=drive_link' }, { year: '2023', link: 'https://drive.google.com/file/d/10QXr5yVPcb3IupcJ8puoM1EvpiwhV6_E/view?usp=drive_link' }] },
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
                { year: '2016', link: 'https://drive.google.com/file/d/1BbWAXO1fdIWlyHote5lQOtnoKn5i6OUu/view?usp=drive_link' },
                { year: '2017', link: 'https://drive.google.com/file/d/1BpeViw-BjXKgvbwGU0CokroSvKt4URMM/view?usp=drive_link' },{ year: '2018', link: 'https://drive.google.com/file/d/1Bex58tAhsFcLI9KMf3ieht-bgeX9iku9/view?usp=drive_link' },
                { year: '2021', link: 'https://drive.google.com/file/d/1Bc16z55TO_LB1m5L7SyR1Tek_hMpgYiP/view?usp=drive_link' },{ year: '2022', link: 'https://drive.google.com/file/d/1B___a5GwO4U6kdjvr749N8FkHif7iNFC/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/1BaKsoWYZ2AARXGCqUQBQ8zSIaZ9G39Ea/view?usp=drive_link' }
              ],
            },
            {
              id: 'database_systems',
              name: 'Database Management System',
              papers: [
                { year: '2020', link: 'https://drive.google.com/file/d/1CC61Sk8PEQwtAGqf6mw_QHkQ27fWUV89/view?usp=drive_link' },
                { year: '2021', link: 'https://drive.google.com/file/d/1CEAdqQJ31PlYgylSUEb-8NM0xibLdOaK/view?usp=drive_link' },{ year: '2022', link: 'https://drive.google.com/file/d/10aFZAqdPohPf3GuVYEWKhtzBhLJzuoZ2/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/10SkdjaWwuczF-inVWMwYWTJin4R1s3V9/view?usp=drive_link' },{ year: '2025', link: 'https://drive.google.com/file/d/1COQRmLfmVwjbLZvgJjCHhMZXGxpdbPHO/view?usp=drive_link' }
              ],
            },
            {
              id: 'big_data',
              name: 'Big Data',
              papers: [{ year: '2022', link: 'https://drive.google.com/file/d/1BIu0xaJKPfsak5u-5dhMtY444eLvhOnv/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/1BDQXOBR4dSKzjYF0mwoYuGaiVsE2cidv/view?usp=drive_link' }],
            },
            {
              id: 'compiler_design',
              name: 'Compiler Design',
              papers: [{ year: '2017', link: 'https://drive.google.com/file/d/1BVgyNJKi0xy67sOreCiXj1p0EeYFo0z7/view?usp=drive_link' },
                { year: '2020', link: 'https://drive.google.com/file/d/1BQFwII-FTHGURbkd3TCF_E8pPSV_r5b2/view?usp=drive_link' },{ year: '2021', link: 'https://drive.google.com/file/d/1BMyLaYaPyOsjIndLnsY7GZE7eE3qa7EG/view?usp=drive_link' },
                { year: '2022', link: 'https://drive.google.com/file/d/1BLozEGkzEvGr9QHcBka9hpWo5TANj8qB/view?usp=drive_link' },{ year: '2023', link: 'https://drive.google.com/file/d/1BLL6CvFXzzirDn2V2nKBnV6tz1jVKYl3/view?usp=drive_link' }],
            },
            {
              id: 'constitution_of_india_law_and_engineering',
              name: 'Constitution of India, Law and Engineering',
              papers: [{ year: '2024', link: '' },
                { year: '2023', link: '' }],
            },
            {
              id: 'data_analytics',
              name: 'Data Analytics',
              papers: [{ year: '2024', link: '' },
                { year: '2023', link: '' }],
            },
            {
              id: 'design_and_analysis_of_algorithm',
              name: 'Design and Analysis of Algorithm',
              papers: [{ year: '2017', link: 'https://drive.google.com/file/d/1CXOA9YSZAs6hbGFEFxPpg6SqXdYKjlrf/view?usp=drive_link' },
                { year: '2018', link: 'https://drive.google.com/file/d/1CmSdxtPAJP6Bkz5cZY6WV6bDYpZsuIIi/view?usp=drive_link' },{ year: '2021', link: 'https://drive.google.com/file/d/1Cmx3oZPxfXBA1fvdpIOSKGvwRRKR48CH/view?usp=drive_link' },
                { year: '2022', link: 'https://drive.google.com/file/d/1CiPOuaEKnIdqjvXmWYAAHiZJgJV-PLN2/view?usp=drive_link' },{ year: '2023', link: 'https://drive.google.com/file/d/1CgGsiiK5t0wRoAwOLOP0jiHRE41RbsQ2/view?usp=drive_link' },{ year: '2025', link: 'https://drive.google.com/file/d/1CYG9KsgFsfe6puSYHEUI_3XbsKTyPAXA/view?usp=drive_link' }],
            },
            {
              id: 'indian_traditions_culture_and_society',
              name: 'Indian Traditions, Culture and Society',
              papers: [{ year: '2022', link: 'https://drive.google.com/file/d/1CqHdJeGoGvZFC2COfDsd5lpW6Lo3xSVG/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/1ConcoxJcpm7frsbYXRmS7yGXCatZe5qs/view?usp=drive_link' }],
            },
            {
              id: 'machine_learning_techniques',
              name: 'Machine Learning Techniques',
              papers: [{ year: '2020', link: 'https://drive.google.com/file/d/1Cs-eWmkZI55EFEfnqY4-T2umA3GTqB0O/view?usp=drive_link' },
                { year: '2021', link: 'https://drive.google.com/file/d/1CzzMjl8dH2thViUBUqEXK3O0TqiVhG7i/view?usp=drive_link' },{ year: '2022', link: 'https://drive.google.com/file/d/1Cw0bEZrUMl6OsR9qHsaBteCgzo-Kjzjd/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/1D0HFgrehQTpzBBA6X5qIuqwXDF18Trmh/view?usp=drive_link' }],
            },
            {
              id: 'sensors_and_transducers',
              name: 'Sensors and Transducers',
              papers: [{ year: '2023', link: 'https://drive.google.com/file/d/10bI1SNTWbwPmLnFAYUIpoZAFxJMIV1EX/view?usp=drive_link' }],
            },
            {
              id: 'software_engineering_3',
              name: 'Software Engineering',
              papers: [{ year: '2016', link: 'https://drive.google.com/file/d/1DBKnqyPfj4VyLsJZvtuMwoewXOn99-ab/view?usp=drive_link' },
                { year: '2017', link: 'https://drive.google.com/file/d/1D3QuFTDf56DGPdh_aIWKvkprI691ZiFf/view?usp=drive_link' },{ year: '2018', link: 'https://drive.google.com/file/d/1DAEST_eYwDH9_fFePetzzOe5OtnlCc_z/view?usp=drive_link' },
                { year: '2021', link: 'https://drive.google.com/file/d/10iG24q9S7g5AdqBxg8AainmtAeg2zhQO/view?usp=drive_link' },{ year: '2022', link: 'https://drive.google.com/file/d/10h6PnD8tv2yOyEVZOfA7IYqc6KleRp07/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/10ot_zIndLuQeYB-nI6NL5_Dh_8-rTOrb/view?usp=drive_link' }],
            },
            {
              id: 'software_project_management',
              name: 'Software Project Management',
              papers: [{ year: '2022', link: 'https://drive.google.com/file/d/1ATrf74Y2bqcQFomFE7yJvRukUucEfdt-/view?usp=drive_link' },
                { year: '2023', link: 'https://drive.google.com/file/d/1AR10hvcYyVodSMuMGXpsxDNH_v1-j8y1/view?usp=drive_link' }],
            },
            {
              id: 'web_designing_3',
              name: 'Web Designing',
              papers: [{ year: '2023', link: 'https://drive.google.com/file/d/16QP4ofHoxfc7i9GSuTcsy_T4KN91qzBW/view?usp=drive_link' },
                { year: '2024', link: 'https://drive.google.com/file/d/16buR9BrhzR65QWBGAT_TCsQWtj_q0V1v/view?usp=drive_link' }],
            },
            {
              id: 'web_technology',
              name: 'Web Technology',
              papers: [{ year: '2016', link: 'https://drive.google.com/file/d/1AcKuC-zAnULHIwRQu0Ra7RdtVw2sENmp/view?usp=drive_link' },
                { year: '2017', link: 'https://drive.google.com/file/d/1AZrY8xA-fLl6C7oLWU_B2e56pOLm4GQr/view?usp=drive_link' },{ year: '2021', link: 'https://drive.google.com/file/d/1B5rlhYciCQWZ1xmDdfMHjS-MAQZxAUsQ/view?usp=drive_link' },
                { year: '2022', link: 'https://drive.google.com/file/d/1AztNvjbiadCZwoxolbzqk7b9pZvApWgm/view?usp=drive_link' },{ year: '2025', link: 'https://drive.google.com/file/d/1AvZHfQPv-XgVlrKFDewy6__VIfoDxqQx/view?usp=drive_link' }],
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
            {
              id: 'big_data_4',
              name: 'Big Data',
              papers: [],
            },
            {
              id: 'cloud_computing',
              name: 'Cloud Computing',
              papers: [],
            },
            {
              id: 'data_warehousing_and_data_mining',
              name: 'Data Warehousing and Data Mining',
              papers: [],
            },
            {
              id: 'project_management_and_entrepreneurship',
              name: 'Project Management and Entrepreneurship',
              papers: [],
            },
            {
              id: 'quality_management',
              name: 'Quality Management',
              papers: [],
            },
            {
              id: 'renewable_energy_resources',
              name: 'Renewable Energy Resources',
              papers: [],
            },
            {
              id: 'rural_development_administration_and_planning',
              name: 'Rural Development: Administration and Planning',
              papers: [],
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


