# Google Sheets Integration Setup Guide

## Step 1: Create a Google Sheet

1. Go to https://sheets.google.com
2. Create a new spreadsheet
3. Name it "Royal Circle Community Responses"
4. In the first row, add these column headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Contact`
   - D1: `Locality`
   - E1: `From Jaipur`
   - F1: `Heritage Connection`
   - G1: `Projects`
   - H1: `Areas of Expertise`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Tools** → **Script Editor**
2. Delete any existing code
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add data to the sheet
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.contact,
      data.locality,
      data.fromJaipur,
      data.royalCircle,
      data.projects,
      data.interests
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', error: e}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy as Web App

1. Click **Deploy** → **New Deployment**
2. Select type: **Web app**
3. Execute as: (Your email)
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy the deployment URL (looks like: `https://script.google.com/macros/s/SCRIPT_ID/usercopy`)

## Step 4: Update Your Form

1. Open your `index.html` or `community-form.html`
2. Find this line in the JavaScript:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercopy';
   ```
3. Replace `YOUR_SCRIPT_ID` with your actual Script ID from Step 3

## Step 5: Test the Form

1. Open your form in a browser
2. Fill out all fields
3. Click "Join the Circle"
4. Check your Google Sheet - the data should appear!

## Viewing Responses

Every form submission will automatically add a row to your Google Sheet. You can:
- View all responses in real-time
- Sort and filter data
- Create charts and graphs
- Export data as CSV/Excel

## Troubleshooting

**Data not appearing?**
- Make sure you deployed the script as "Anyone"
- Check browser console for errors (F12)
- Verify the Script URL is correct

**Script not working?**
- Make sure sheet column headers match exactly
- Check the Apps Script error logs

---

**Need help?** Contact your form administrator.
