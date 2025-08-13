const CBSE = {
  classes: [
    {
      id: 'class10',
      name: 'Class 10',
      subjects: [
        { id: 'english', name: 'English', notes: [{ title: 'English Notes', link: '#' }] },
        { id: 'hindi', name: 'Hindi', notes: [{ title: 'Hindi Notes', link: '#' }] },
        { id: 'physics', name: 'Physics', notes: [{ title: 'Physics Notes', link: '#' }] },
        { id: 'chemistry', name: 'Chemistry', notes: [{ title: 'Chemistry Notes', link: '#' }] },
        { id: 'maths', name: 'Mathematics', notes: [{ title: 'Mathematics Notes', link: '#' }] },
        { id: 'biology', name: 'Biology', notes: [{ title: 'Biology Notes', link: '#' }] },
        { id: 'history', name: 'History', notes: [{ title: 'History Notes', link: '#' }] },
        { id: 'geography', name: 'Geography', notes: [{ title: 'Geography Notes', link: '#' }] },
        { id: 'civics', name: 'Civics', notes: [{ title: 'Civics Notes', link: '#' }] },
      ],
    },
    {
      id: 'class12',
      name: 'Class 12',
      // Class 12 has streams → Science, Arts, Commerce
      streams: [
        {
          id: 'science',
          name: 'Science',
          // Maths and Bio together in same stream
          subjects: [
            { id: 'physics', name: 'Physics', notes: [{ title: 'Physics Notes', link: '#' }] },
            { id: 'chemistry', name: 'Chemistry', notes: [{ title: 'Chemistry Notes', link: '#' }] },
            { id: 'mathematics', name: 'Mathematics', notes: [{ title: 'Mathematics Notes', link: '#' }] },
            { id: 'biology', name: 'Biology', notes: [{ title: 'Biology Notes', link: '#' }] },
            { id: 'english', name: 'English', notes: [{ title: 'English Notes', link: '#' }] },
          ],
        },
        {
          id: 'arts',
          name: 'Arts',
          subjects: [
            { id: 'history', name: 'History', notes: [{ title: 'History Notes', link: '#' }] },
            { id: 'geography', name: 'Geography', notes: [{ title: 'Geography Notes', link: '#' }] },
            { id: 'political_science', name: 'Political Science', notes: [{ title: 'Political Science Notes', link: '#' }] },
            { id: 'economics', name: 'Economics', notes: [{ title: 'Economics Notes', link: '#' }] },
            { id: 'english', name: 'English', notes: [{ title: 'English Notes', link: '#' }] },
            { id: 'hindi', name: 'Hindi', notes: [{ title: 'Hindi Notes', link: '#' }] },
          ],
        },
        {
          id: 'commerce',
          name: 'Commerce',
          subjects: [
            { id: 'accountancy', name: 'Accountancy', notes: [{ title: 'Accountancy Notes', link: '#' }] },
            { id: 'business_studies', name: 'Business Studies', notes: [{ title: 'Business Studies Notes', link: '#' }] },
            { id: 'economics', name: 'Economics', notes: [{ title: 'Economics Notes', link: '#' }] },
            { id: 'mathematics', name: 'Mathematics', notes: [{ title: 'Mathematics Notes', link: '#' }] },
            { id: 'english', name: 'English', notes: [{ title: 'English Notes', link: '#' }] },
          ],
        },
      ],
    },
  ],
};

export default CBSE;


