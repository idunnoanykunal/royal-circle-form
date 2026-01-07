function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add data to the sheet (includes all 14 fields from both form pages)
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

