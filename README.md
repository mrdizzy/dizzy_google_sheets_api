# dizzy_google_sheets_api

## Installation

Use `npm install https://github.com/mrdizzy/dizzy_google_sheets_api.git --save`

## Initialization

Require the module and set the spreadsheetId of the spreadsheet you want to use. The spreadsheetID can be found by looking at the URL of the sheet you are working on when using Google Sheets. Eg:

https://docs.google.com/spreadsheets/d/1yLZ5W59IBxDG-8FsqPSgvkv22WySc8h--C-VkA73j9I/edit`
`
The spreadsheetID comes after `spreadsheets/d/SPREADSHEETID`


```javascript
const Sheets = require('dizzy_google_sheets_api')
const spreadsheetId = "1H2-Bo6LhYNEs4zUVmLkbH3F0t1mDoCpZMBA1DBap7A8";
```



var sheets_api = new Sheets(spreadsheetId, 0, credentials);
sheets_api.getRowsIfColumnMatches(["GM10"], "B", function(response) {
    console.log(response);
})
