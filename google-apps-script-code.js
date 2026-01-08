function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Handle file upload if payment screenshot is provided
    let paymentScreenshotUrl = '';
    if (data.paymentScreenshot && data.paymentScreenshotName) {
      try {
        // Convert base64 to blob
        const base64Data = data.paymentScreenshot.split(',')[1] || data.paymentScreenshot;
        const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), data.paymentScreenshotType || 'image/png', data.paymentScreenshotName);
        
        // Create folder for payment screenshots if it doesn't exist
        const folderName = 'Royal Circle Payment Screenshots';
        let folder;
        const folders = DriveApp.getFoldersByName(folderName);
        if (folders.hasNext()) {
          folder = folders.next();
        } else {
          folder = DriveApp.createFolder(folderName);
        }
        
        // Upload file to Google Drive
        const file = folder.createFile(blob);
        
        // Set file permissions to "Anyone with the link can view"
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        
        // Get file URL
        paymentScreenshotUrl = file.getUrl();
      } catch(fileError) {
        console.error('File upload error:', fileError);
        paymentScreenshotUrl = 'Error uploading file: ' + fileError.toString();
      }
    }
    
    // Add data to the sheet (includes all fields from all 3 pages)
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.profession || '',
      data.instagram || '',
      data.royalCircle,
      data.projects,
      data.interests,
      data.address || '',
      data.contact || '',
      data.locality || '',
      data.fromJaipur || '',
      data.location || '',
      data.latitude || '',
      data.longitude || '',
      paymentScreenshotUrl
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', error: e.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

