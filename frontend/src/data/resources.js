// Add your Google Drive resource links here. The counter on Home will use this.
// Example:
// {
//   category: 'Computer Science',
//   links: ['https://drive.google.com/your-file-1', 'https://drive.google.com/your-file-2']
// }

export const driveResources = [
  { category: 'Notes', links: [] },
  { category: 'Previous Year Papers', links: [] },
  { category: 'Syllabus', links: [] },
]

export function getTotalResourceCount() {
  return driveResources.reduce((sum, group) => sum + (group.links?.length || 0), 0)
}


