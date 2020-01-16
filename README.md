# dizzy_google_sheets_api

## Installation

Use `npm install https://github.com/mrdizzy/dizzy_google_sheets_api.git--save`

## Initialization

Require the module and set the spreadsheetId of the spreadsheet you want to use. 

```javascript
const Sheets = require('dizzy_google_sheets_api')
const spreadsheetId = "1H2-Bo6LhYNEs4zUVmLkbH3F0t1mPoCpZMBA1DBap7A8";
```



var sheets_api = new Sheets(spreadsheetId, 0, credentials);
sheets_api.getRowsIfColumnMatches(["GM10"], "B", function(response) {
    console.log(response);
})
