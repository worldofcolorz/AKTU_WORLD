# Google Sheets Integration Setup

## Overview
The contact form in the footer now sends data to Google Sheets with the following columns:
- Timestamp (IST)
- Name
- Mobile
- Email
- Message Title
- Message
- Word Count

## Setup Steps

### 1. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add these headers in row 1:
   ```
   A: Timestamp | B: Name | C: Mobile | D: Email | E: Message Title | F: Message | G: Word Count
   ```

### 2. Create Google Apps Script
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Replace the default code with:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    const row = [
      data.timestamp,
      data.name,
      data.mobile,
      data.email,
      data.messageTitle,
      data.message,
      data.wordCount
    ];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Contact form endpoint is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### 3. Deploy the Script
1. Click **Deploy** → **New deployment**
2. Choose **Web app** as type
3. Set **Execute as**: Me
4. Set **Who has access**: Anyone
5. Click **Deploy**
6. Copy the **Web app URL**

### 4. Update the Code
1. Replace `YOUR_SCRIPT_ID` in `frontend/src/components/Footer/Footer.jsx` with your actual script ID
2. The script ID is the long string in the URL between `/s/` and `/exec`

Example:
```javascript
// Change this line:
const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {

// To this (replace with your actual ID):
const response = await fetch('https://script.google.com/macros/s/AKfycbz1234567890abcdefghijklmnopqrstuvwxyz/exec', {
```

### 5. Test
1. Fill out the contact form
2. Submit
3. Check your Google Sheet for new rows

## Features
- ✅ 30-word limit with real-time counter
- ✅ Timestamp in Indian Standard Time
- ✅ Form validation
- ✅ Loading states
- ✅ Success/error handling
- ✅ Auto-reset after submission

## Troubleshooting
- If you get CORS errors, the script is working but the response can't be read (this is normal with `no-cors`)
- Check the Apps Script logs for any errors
- Ensure the sheet has the correct column headers
- Verify the script ID is correct in the code
