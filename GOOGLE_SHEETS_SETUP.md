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
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get parameters from the GET request
    const params = e.parameter;
    
    // Extract data from URL parameters
    const timestamp = params.timestamp || new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'});
    const name = params.name || '';
    const mobile = params.mobile || '';
    const email = params.email || '';
    const messageTitle = params.messageTitle || '';
    const message = params.message || '';
    const wordCount = params.wordCount || 0;
    
    // Create row data
    const row = [
      timestamp,
      name,
      mobile,
      email,
      messageTitle,
      message,
      wordCount
    ];
    
    // Append to sheet
    sheet.appendRow(row);
    
    // Return success response
    return ContentService
      .createTextOutput('Data received successfully!')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch(error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput('Error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

// Keep doPost for backward compatibility (optional)
function doPost(e) {
  return doGet(e); // Redirect POST to GET handler
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
- ✅ CORS-free image-based tracking

## Troubleshooting
- **If no data appears**: Check that your Google Apps Script has the updated `doGet` function
- **Check Apps Script logs**: Go to Apps Script → Executions to see if requests are being received
- **Verify deployment**: Make sure the script is deployed as a Web app with "Anyone" access
- **Check sheet headers**: Ensure your Google Sheet has the exact column headers shown above
- **Test the script URL**: Try opening your script URL directly in a browser to see if it responds

## Important Notes
- The script now handles GET requests (which is what the frontend sends)
- Data comes through URL parameters instead of JSON body
- The `doGet` function extracts data from `e.parameter` object
- Both `doGet` and `doPost` are supported for flexibility
