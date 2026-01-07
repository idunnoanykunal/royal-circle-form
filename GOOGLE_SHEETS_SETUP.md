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
   - I1: `Address`
   - J1: `Location`
   - K1: `Latitude`
   - L1: `Longitude`
   - M1: `Profession`
   - N1: `Instagram Handle`

## Step 2: Update Existing Sheet (If You Already Have One)

**Skip this step if you're creating a new sheet.**

If you already have a Google Sheet set up with the old columns, you need to add the new columns:

1. Open your existing Google Sheet
2. Add these new column headers in row 1 (after column H):
   - I1: `Address`
   - J1: `Location`
   - K1: `Latitude`
   - L1: `Longitude`
   - M1: `Profession`
   - N1: `Instagram Handle`
3. Continue to Step 3 to update your Google Apps Script code

## Step 3: Create/Update Google Apps Script

1. In your Google Sheet, click **Tools** → **Script Editor**
2. Delete any existing code
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add data to the sheet (includes all fields from both form pages)
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.contact,
      data.locality,
      data.fromJaipur,
      data.royalCircle,
      data.projects,
      data.interests,
      data.address || '',
      data.location || '',
      data.latitude || '',
      data.longitude || '',
      data.profession || '',
      data.instagram || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', error: e}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 5: Deploy as Web App

1. Click **Deploy** → **New Deployment** (or **Manage Deployments** if updating)
2. Select type: **Web app**
3. Execute as: (Your email)
4. Who has access: **Anyone**
5. Click **Deploy** (or **Update** if editing existing deployment)
6. Copy the deployment URL (looks like: `https://script.google.com/macros/s/SCRIPT_ID/usercopy`)

**Note:** If updating an existing deployment, make sure to update the version number.

## Step 6: Update Your Form

1. Open your `index.html` or `community-form.html`
2. Find this line in the JavaScript:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercopy';
   ```
3. Replace `YOUR_SCRIPT_ID` with your actual Script ID from Step 4

## Step 7: Test the Form

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
