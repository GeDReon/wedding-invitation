/**
 * Google Apps Script для приёма RSVP-ответов в Google Sheets
 *
 * ИНСТРУКЦИЯ:
 * 1. Создайте новую Google Таблицу
 * 2. Переименуйте первый лист в "RSVP" (или измените SHEET_NAME ниже)
 * 3. Extensions → Apps Script
 * 4. Вставьте этот код
 * 5. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Скопируйте URL деплоя в .env.local → NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 */

const SHEET_NAME = "RSVP";

const HEADERS = [
  "Дата",
  "Имя",
  "Фамилия",
  "Телефон",
  "Приду",
  "С супругом",
  "Количество",
  "Комментарий",
  "UserAgent",
  "Язык браузера",
];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function parseRequestBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return null;
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    return null;
  }
}

function sanitize_(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/script/gi, "")
    .replace(/javascript:/gi, "");
}

function formatAttendance_(value) {
  if (value === "yes") return "Да";
  if (value === "no") return "Нет";
  return sanitize_(value);
}

function doPost(e) {
  try {
    const data = parseRequestBody_(e);

    if (!data) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: "Invalid JSON" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const firstName = sanitize_(data.firstName);
    const lastName = sanitize_(data.lastName);

    if (firstName.length < 2 || lastName.length < 2) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: "Validation failed" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = getSheet_();
    const createdAt = data.createdAt
      ? new Date(data.createdAt)
      : new Date();

    sheet.appendRow([
      createdAt,
      firstName,
      lastName,
      sanitize_(data.phone),
      formatAttendance_(data.attendance),
      formatAttendance_(data.withPartner),
      sanitize_(data.guests),
      sanitize_(data.comment),
      sanitize_(data.userAgent),
      sanitize_(data.language),
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: String(error) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Wedding RSVP endpoint is running" })
  ).setMimeType(ContentService.MimeType.JSON);
}
