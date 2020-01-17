# dizzy_google_sheets_api

## Installation

Use `npm install https://github.com/mrdizzy/dizzy_google_sheets_api.git --save`

## Initialization

Require the module and set the spreadsheetId of the spreadsheet you want to use. The spreadsheetID can be found by looking at the URL of the sheet you are working on when using Google Sheets. Eg:

https://docs.google.com/spreadsheets/d/1yLZ5W59IBxDG-8FsqPSgvkv22WySc8h--C-VkA73j9I/edit`

The spreadsheetID comes after `spreadsheets/d/SPREADSHEETID`

```javascript
const Sheets = require('dizzy_google_sheets_api')
const spreadsheetId = "1H2-Bo6LhYNEs4zUVmLkbH3F0t1mDoCpZMBA1DBap7A8";
```

## Credentials

The credentials object must have the following key-value pairs:

```javascript
{
  client_email: "name@googleclientemail.com",
  private_key:  "----BEGIN KEY---kjsdkjhskfhsjkdf---END KEY---"
}
```

These are obtained by creating a Google Cloud service account and creating and downloading a key for that account. 

The spreadsheet should also be shared with the client_email: go to **share** in the Google sheets app and add the client_email generated in the key for the service account. 
var sheets_api = new Sheets(spreadsheetId, 0, credentials);
sheets_api.getRowsIfColumnMatches(["GM10"], "B", function(response) {
    console.log(response);
})
