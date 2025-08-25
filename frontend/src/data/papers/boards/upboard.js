// UP Board → Classes → Subjects → Papers

const UPBOARD = {
  classes: [
    {
      id: 'class10',
      name: 'Class 10',
      subjects: [
        {
          id: 'computer',
          name: 'Computer',
          papers: [
            { year: '2020', link: 'https://drive.google.com/file/d/1sPGzws24iRZE1jOjPcc3F8L_75fPNp19/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1oAkTwir4SIeB3PW5vSuHnG6idkRrppcV/view?usp=drive_link' }
          ],
        },
        {
          id: 'drawing',
          name: 'Drawing',
          papers: [
            { year: '2024', link: 'https://drive.google.com/file/d/1sV-6d7FCSroTLi2aZHC8u2ca0_O9vHmB/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1oAAiYvXcezUOPLFsntNpr8PQsmnbXv8X/view?usp=drive_link' }
          ],
        },
        {
          id: 'english',
          name: 'English',
          papers: [
            { year: '2022', link: 'https://drive.google.com/file/d/1tKap5R6uPvcUJmmrmWixI6hAJybuR76S/view?usp=drive_link' },
            { year: '2023', link: 'https://drive.google.com/file/d/1tEnVSfgFQQpJ9yiRh6uEAK16fUAC7OYQ/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/1t9F4s8AIaNH9hr2FFhCtwIXgXHLEST48/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1oFSEJkY88qr1WTmedaA2P-8mcyXNcztZ/view?usp=drive_link' }
          ],
        },
        {
          id: 'hindi',
          name: 'Hindi',
          papers: [
            { year: '2022', link: 'https://drive.google.com/file/d/1tUbJUToU1hLRMcIinO1gUwdCYaz4ql10/view?usp=drive_link' },
            { year: '2023', link: 'https://drive.google.com/file/d/1tTyQb_OvsrHA4tTEF2F03vTxWW-y9sEy/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/1tOCl_1xh4aHr6ygcFJrMZQHBzAYI3GxM/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1oHYFyJ3BkjU-ck-oyLeADZiectKoqH3A/view?usp=drive_link' }
          ],
        },
        {
          id: 'mathematics',
          name: 'Mathematics',
          papers: [
            { year: '2022', link: 'https://drive.google.com/file/d/1taJqJ74RfWMjSrUsVij_gYki3Z7qNUNY/view?usp=drive_link' },
            { year: '2023', link: 'https://drive.google.com/file/d/1toi-nn1qdWSEgWjHl-1mrdefQKEKbxXm/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/1tnbsgArjHl1HFXAIoWfdDO7OcY0g2mJn/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1oINcu_vZ22U_OeKLiKzLV0kba0wF2GUW/view?usp=drive_link' }
          ],
        },
        {
          id: 'sanskrit',
          name: 'Sanskrit',
          papers: [
            { year: '2022', link: 'https://drive.google.com/file/d/1uArv1_XMNZPAzBUQkayqy1cYxsSnE9aC/view?usp=drive_link' },
            { year: '2023', link: 'https://drive.google.com/file/d/1tyJ52kvM5tL5FeKJuNF0_YI0l-9IXaV_/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/1tyHWUI5uzCYbvsBGfdtp53MYYNggmvBD/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1oJMhCn979jKo7FlWFj57rKRJDtGLnSYa/view?usp=drive_link' }
          ],
        },
        {
          id: 'science',
          name: 'Science',
          papers: [
            { year: '2022', link: 'https://drive.google.com/file/d/1uLvW_h7Fq26x2B32Qcn7-l2hYy0jmprr/view?usp=drive_link' },
            { year: '2023', link: 'https://drive.google.com/file/d/1uJ3bvxe6LG8ollM26dgcl1HhVd5pEXks/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/1uFCWWl--iFtd4yCE_3P73qJ47WDfoUOe/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1oKZHEYiPxqibywQGDsPIjC_bQ_n3sjY8/view?usp=drive_link' }
          ],
        },
        {
          id: 'social_science',
          name: 'Social Science',
          papers: [
            { year: '2021', link: 'https://drive.google.com/file/d/1uM4k-cCaGFENDrMG5tTilbHdtv9Dmb-d/view?usp=drive_link' },
            { year: '2022', link: 'https://drive.google.com/file/d/1uP8rYHYhV_ws6oXKHeRiQqxhlHoZv1Ie/view?usp=drive_link' },{ year: '2023', link: 'https://drive.google.com/file/d/1uNoR0sMzlJZKtGBvylh2ILuM4HDn1O-J/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1obq0_uH4rF03ooaPai8gRRuYFn5QEd-G/view?usp=drive_link' }
          ],
        },
      ],
    },
    {
      id: 'class12',
      name: 'Class 12',
      subjects: [
        {
          id: 'biology',
          name: 'Biology',
          papers: [
            { year: '2022', link: 'https://drive.google.com/file/d/1kkL7RoRKOQY1iRzVSAtYDwH2MWhQXxhT/view?usp=drive_link' },
            { year: '2023', link: 'https://drive.google.com/file/d/1kgket33veQlqvhJ-sKQFBEjvV0sMNbDt/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/1kaM3ozW6Jq3ZfaQYoPZWm0GS1tYuy8ax/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1ka2sJs-9KHH6quxB5M49i8URv7ia6IaZ/view?usp=drive_link' }
          ],
        },
        {
          id: 'chemistry',
          name: 'Chemistry',
          papers: [
            { year: '2022', link: 'https://drive.google.com/file/d/1l1z_e9vqfKxICB055Gejkg2EDlJE0Dup/view?usp=drive_link' },
            { year: '2023', link: 'https://drive.google.com/file/d/1kyRxWLkiWzDPXWJ14myV5BHzn67Dy6dW/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/1ktc1w8zeliq2RL_0j8QEThLNDyGJeNz8/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1lDk-CVg7MP8hvZz7hWK5-eqXcdGNUxAt/view?usp=drive_link' }
          ],
        },
        {
          id: 'computer',
          name: 'Computer',
          papers: [
            { year: '2023', link: 'https://drive.google.com/file/d/1lEDSpTYBA1BvOt3eIgNQFdW9Z4yrmih1/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1lN4AcpyZh4zRXHyQyuZ-me1jGz1BHWI8/view?usp=drive_link' }
          ],
        },
        {
          id: 'english',
          name: 'English',
          papers: [
            { year: '2022', link: 'https://drive.google.com/file/d/1luTvrE8kY5vxdBnkhSBlZC3Q0TUn5trg/view?usp=drive_link' },
            { year: '2023', link: 'https://drive.google.com/file/d/1lpU57wAKXyRVtY3c2Jgv8XvOReIB3m04/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/1l_EUk7X5Ll2fl2hXFBDMRXrH3R5efHup/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1lU-IQ9kbUdHEFCf0d6m4pufQ2KXCyyja/view?usp=drive_link' }
          ],
        },
        {
          id: 'hindi',
          name: 'Hindi',
          papers: [
            { year: '2023 General', link: 'https://drive.google.com/file/d/1mLwZ7td_pCMNv-EbAJNH4KvQwXs_jp1z/view?usp=drive_link' },
            { year: '2023', link: 'https://drive.google.com/file/d/1mLBSVkYzqBrZyQFuIluWllyawmHKIa4J/view?usp=drive_link' },{ year: '2024 General', link: 'https://drive.google.com/file/d/1mIN-1DCFO1U9FyBx0alYKAs64pVcS5fY/view?usp=drive_link' },
            { year: '2024', link: 'https://drive.google.com/file/d/1mEeXyfGjgMSi1g0ILcDujjZZl1J7uy0K/view?usp=drive_link' },{ year: '2025 General', link: 'https://drive.google.com/file/d/1mC8bpTfHEfFy21f4akjhOHgwI83M6XVJ/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1mBxw37ow4WLgWc8K5WzfOOedkQpOhb-E/view?usp=drive_link' }
          ],
        },
        {
          id: 'mathematics',
          name: 'Mathematics',
          papers: [
            { year: '2022', link: 'https://drive.google.com/file/d/1mmbjY2ZkBrpQuAp5oqYYZokPOIEdOL9G/view?usp=drive_link' },
            { year: '2023', link: 'https://drive.google.com/file/d/1mhgu_cFHlIlw-6mBc3FlJzCS-uUGgeyJ/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/1meN3SI0-FTGo5ClTKJ-huBoY6H1h6b5P/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1masCfyu4Z_Z3BlzcPIqPX94rgXr5SsuW/view?usp=drive_link' }
          ],
        },
        {
          id: 'physics',
          name: 'Physics',
          papers: [
            { year: '2022', link: 'https://drive.google.com/file/d/1nSU5WHoBC5P1uafDl4vL0teIiI9Fqp3Q/view?usp=drive_link' },
            { year: '2023', link: 'https://drive.google.com/file/d/1nRHBCW6Zdk9PowKRGXm_YpEeTk14SNGa/view?usp=drive_link' },{ year: '2024', link: 'https://drive.google.com/file/d/1nPmCVMBBo-D9PTXhEAepv0p7uNMbc9i7/view?usp=drive_link' },
            { year: '2025', link: 'https://drive.google.com/file/d/1nLy1BAnmnxZ_-xO-8kPRMgR41vHkH6s_/view?usp=drive_link' }
          ],
        },
      ],
    },
  ],
};

export default UPBOARD;
