"use server"

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Set up authentication
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS!),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function getGoogleFormData() {
  const spreadsheetId = process.env.sheet_id;
  const range = 'A:I';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;
  if (rows.length) {
    console.log('Data:', rows);
  } else {
    console.log('No data found.');
  }
}

getGoogleFormData().catch(console.error);
