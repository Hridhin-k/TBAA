/**
 * Google Apps Script for The Better Academy registration form.
 *
 * Setup:
 * 1. Create a new Google Sheet with headers in row 1 (see HEADERS below)
 * 2. Extensions → Apps Script → paste this code
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the deployment URL to NEXT_PUBLIC_GOOGLE_SCRIPT_URL in .env.local
 */

const SHEET_NAME = "Applications";

const HEADERS = [
  "Timestamp",
  "Full Name",
  "Email",
  "Phone",
  "Age",
  "City",
  "Profession",
  "Experience",
  "Motivation",
  "Portfolio Link",
  "Instagram",
  "LinkedIn",
  "Source",
];

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonResponse({ success: false, message: "Sheet not found" });
    }

    const data = JSON.parse(e.postData.contents);

    if (data.website) {
      return jsonResponse({ success: true, message: "Received" });
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.age || "",
      data.city || "",
      data.profession || "",
      data.experience || "",
      data.motivation || "",
      data.portfolioLink || "",
      data.instagram || "",
      data.linkedin || "",
      data.source || "website",
    ]);

    return jsonResponse({ success: true, message: "Application received" });
  } catch (error) {
    return jsonResponse({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

function doGet() {
  return jsonResponse({ success: true, message: "The Better Academy registration endpoint" });
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
}
