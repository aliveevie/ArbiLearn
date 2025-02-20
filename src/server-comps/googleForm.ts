"use server"
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// // Load the credentials
// const credentials = {
//     "type": "service_account",
//     "project_id": "gen-lang-client-0345261758",
//     "private_key_id": "28c13d892896a86892333160b201579dd55a3ba4",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLlbySalJEPwmL\nENIqQ+Vukndj2hwAcR92GfkZhanhe5lpIcAQsGwGrLVuQG+DeXI1zHBKBrNOCdZJ\n27hWiQ6wlz8oScN5LyDfovPwiBNwBsQfC5jXiOOn/G6el8+iDSeCBySeL7MLdo2v\n3iYYp5R+Rv0lp2L3rlhVjkpsSYWO8f6zQsUKcqpzEHqCQfgPacyjSQEw6cgve6zB\nqyH9yNktkxRf2FtgRifYKa8xUAVrjKNJesOeCYSFH84jZtrRSj/c51PlQD2dJL1D\nQrClfi4FNbxoqmHkS8qHwym7iacVFdnpVLtgPgyi9fekmpwwimoUh3zX04tibGw6\ntCYhqhthAgMBAAECggEAFI3p48t1wlut8jswyOEhgywo/y0YeifxsfoV1xCScghJ\nWR619kllorfhun+pcpf6orlhFew+wrCGEN9s6Vm9oLEoiIAICw5pzoJ0iBKpCby5\nJNxGIm64828uWPdBWJ5k4IEpnon41P2zeO/gH0meGbC/osNXX+Pbmcm7tFqo8CFK\n/9Q1FRgxFJLa7qQ3Kpd7UMuA/RsB1CXlklyoioZ8PC36xGxq1hu/AS2J13xvaoq3\nZeW7zd9DSemL3jAu9ue7681dmr0xHR0iqzG5JO0hPDXomsfdERhRGak8LmFg+wwr\nXb+/mD8aSYhBkh/9oP4kG+M+8snI1J06AOLxsVoaEQKBgQDtqYxFSAidpvdwDPCT\nf8c5sWyaQUetkVmczxWRgs4JST7lSi0aussMTFVefbFzevc7W5XznBeqM0h7oIMp\nn1XB+EpnczaGW60EaLpVZd0n8o5Kw6m6vQUR8oAbbEtVcLj4JLkWgEAXDU1zbJac\nDaSinEo4OOIS88hsPC3sGV7VqQKBgQDbSxI07AE2qK4N0JJP1y0dngSIG7XqZ4OK\nyXoqiR6q1xQ45W9jt7XQmPj2miGsgsR5bBqpKLgI1lcfc3+k9zxa26ybMWykMuud\npFyQ4tI4mR1Rt91xCa7iraSPXTyzBt7h8fyO3tLeC994oE0iMYzvHactgKFquHpJ\ntotPsmQ6+QKBgQDnEN8mRODLlpggQxRr8+HY/92dJDbyU80SnmxT6x8y/BnAiBvO\nTyo3LMgbdI1gv388INFr5qlDe1TPjcG4aAfS7Po6FlQ+0UcocEIp4T3iJvudSRru\nSfRx/Jn9D4825L+R0vJ5I/wr7W0N+dd8pe8ZgmbOvs9eqdKFGQV09T208QKBgD+T\nbBvbsB5gmNV4enKbN4E2pqmvHvZuPDyoXLqoNjPhVwOHwNtwD04Ci2szFEAnST7K\nkJAqNfCZ83gyy/bPlrfgqBH2KkEQYi65z/xRRhESkuV2IMT8wa8GGIdXyJk+jK+E\nsGvbPdcSKh+WmcYoB2vrdOREPofqI8nrGkhot5ZBAoGAIScMW11wtNYO3Hmkj9Y1\nz0/5fg6lXifoJvXc4nnrdmNxgEa2fRMide9U5qLvxwza9IKuEyK+l22RlGYwfDHa\nBeuzbEIVoUbqH1gHwEktnxD9A+G4EaOlkCp1i6z5pMp9A9N3fTJGiP+g3vkmTJv3\nFTRQgUP5vy2pISv7VauOf1k=\n-----END PRIVATE KEY-----\n",
//     "client_email": "arbilearn@gen-lang-client-0345261758.iam.gserviceaccount.com",
//     "client_id": "106811242002876415539",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/arbilearn%40gen-lang-client-0345261758.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
//   }
  

  
// Set up authentication
const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Points to credentials file
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
