# Troubleshooting: Form Not Updating with New Columns

If your form submissions are not showing the new columns (Address, Location, Latitude, Longitude, Profession, Instagram Handle), follow these steps:

## Step 1: Verify Google Sheet Has All Column Headers

Your Google Sheet **must** have exactly these 14 columns in row 1:

| Column | Header |
|--------|--------|
| A | Timestamp |
| B | Name |
| C | Contact |
| D | Locality |
| E | From Jaipur |
| F | Heritage Connection |
| G | Projects |
| H | Areas of Expertise |
| **I** | **Address** |
| **J** | **Location** |
| **K** | **Latitude** |
| **L** | **Longitude** |
| **M** | **Profession** |
| **N** | **Instagram Handle** |

**Action:** Add columns I through N if they don't exist.

---

## Step 2: Update Google Apps Script Code

1. Open your Google Sheet
2. Click **Tools** → **Script Editor**
3. **Delete all existing code**
4. Copy and paste this **complete** code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add data to the sheet (includes all 14 fields)
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
    return ContentService.createTextOutput(JSON.stringify({status: 'error', error: e.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Click **Save** (Ctrl+S or Cmd+S)
6. **Important:** You must redeploy after updating the code!

---

## Step 3: Redeploy the Script (CRITICAL!)

**This is the most common issue - the script code is updated but not redeployed.**

1. In the Script Editor, click **Deploy** → **Manage Deployments**
2. Click the **pencil icon** (Edit) next to your existing deployment
3. Click **New version** (this creates a new version with your updated code)
4. Click **Deploy**
5. **Copy the new deployment URL** (it should be the same, but verify it)

**OR** if you prefer to create a fresh deployment:

1. Click **Deploy** → **New Deployment**
2. Select type: **Web app**
3. Execute as: (Your email)
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy the new deployment URL

---

## Step 4: Verify the Form URL

Make sure your form is using the correct Google Apps Script URL:

1. Open `index.html`
2. Find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
3. Verify it matches your deployment URL from Step 3

---

## Step 5: Test the Form

1. Open your form in a browser
2. Open browser Developer Tools (F12)
3. Go to the **Console** tab
4. Fill out the form completely (both pages)
5. Click "Join the Circle"
6. Check the console - you should see: `Form Data: {...}` with all fields
7. Check your Google Sheet - all 14 columns should have data

---

## Common Issues & Solutions

### Issue: Only old columns are filling, new columns are empty

**Solution:** 
- The script code wasn't updated OR
- The script wasn't redeployed after updating
- **Fix:** Follow Steps 2 and 3 above

### Issue: Data appears in wrong columns

**Solution:**
- Column headers don't match the order in the script
- **Fix:** Make sure your sheet headers match exactly the order in Step 1

### Issue: Script error in Google Apps Script

**Solution:**
1. In Script Editor, click **View** → **Execution log**
2. Check for error messages
3. Common errors:
   - Missing column headers → Add all 14 columns
   - Data type mismatch → Check that all fields are being sent

### Issue: Form submits but nothing appears in sheet

**Solution:**
- Check that deployment is set to "Anyone" (not "Only me")
- Verify the script URL in the form matches the deployment URL
- Check browser console for fetch errors

---

## Quick Checklist

- [ ] Google Sheet has all 14 column headers (A through N)
- [ ] Google Apps Script code is updated with all 14 fields
- [ ] Script is saved
- [ ] Script is redeployed (new version created)
- [ ] Form URL matches deployment URL
- [ ] Deployment is set to "Anyone"
- [ ] Tested form submission
- [ ] Checked browser console for errors

---

## Still Not Working?

1. **Check the execution log:**
   - Script Editor → View → Execution log
   - Look for error messages

2. **Test the script directly:**
   - In Script Editor, add a test function:
   ```javascript
   function test() {
     const testData = {
       timestamp: new Date().toLocaleString(),
       name: "Test User",
       contact: "1234567890",
       locality: "Test City",
       fromJaipur: "Yes",
       royalCircle: "Test connection",
       projects: "Test projects",
       interests: "Test interest",
       address: "Test Address",
       location: "Test Location",
       latitude: "20.5937",
       longitude: "78.9629",
       profession: "Test Profession",
       instagram: "@test"
     };
     
     const mockEvent = {
       postData: {
         contents: JSON.stringify(testData)
       }
     };
     
     doPost(mockEvent);
   }
   ```
   - Run this function and check if data appears in your sheet

3. **Verify form is sending data:**
   - Open browser console (F12)
   - Submit form
   - Check the `Form Data:` log - all 14 fields should be present

---

**Need more help?** Check the `GOOGLE_SHEETS_SETUP.md` file for detailed setup instructions.

