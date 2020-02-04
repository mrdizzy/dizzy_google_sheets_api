const {
    google
} = require("googleapis");

module.exports = class Sheets {

    constructor(spreadsheetId, worksheetId, JWTcredentials) {

        const jwt = new google.auth.JWT(JWTcredentials.client_email, null, JWTcredentials.private_key, ["https://www.googleapis.com/auth/spreadsheets"])
        this._sheetsApi = google.sheets({
            version: "v4",
            auth: jwt
        });
        this.spreadsheetId = spreadsheetId;
        this.worksheetId = worksheetId;
        this.getColumnNumber = {
            A: 0,
            B: 1,
            C: 2,
            D: 3,
            E: 4,
            F: 5,
            G: 6,
            H: 7,
            I: 8,
            J: 9,
            K: 10,
            L: 11,
            M: 12,
            N: 13
        }
    }

    /*********************************
     ** Update a range of cells
     * 
     *  Returns a response object
     * data: { spreadsheetId: '1H2-Bo6LhYNEs4zUVmLkbH3F0t1mPoCpZMBA1DBap7A8',
     *    updatedRange: 'Inventory!G5',
     *   updatedRows: 1,
     *  updatedColumns: 1,
     *  updatedCells: 1 }
     **********************************
    // range needs to be in format "A1:A500"
    // values need to be an array of arrays, e.g. [["David", "21", "Mexico"], ["Margaret", "38", "New York"], ["Janice", "87", "Oklahoma"]]
    // Example:
    // appendValuesToSheet("1azYt9zUxNhyacmyoyboS7I9AFEMFE-Fo5gEkkQIOh_8", "A1:D500", [["David", "21", "Mexico"], ["Margaret", "38", "New York"], ["Janice", "87", "Oklahoma"]])*/

    setWorksheetId(id) {
        this.worksheetId = id;
    }
    appendValuesToSheet(range, arrayOfArrayValues) {
        return this._sheetsApi.spreadsheets.values.append({
            spreadsheetId: this.spreadsheetId,
            range: range,
            insertDataOption: "INSERT_ROWS",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: arrayOfArrayValues
            }
        })
    }

    // takes objects containing key value pairs and puts them into the *args array:
    // { 
    //    "range": "A2:B2",
    //    "values": [[ "David", "18"]]
    // }

    batchUpdateCells(...args) {
        return this._sheetsApi.spreadsheets.values.batchUpdate({
            spreadsheetId: this.spreadsheetId,
            resource: {
                valueInputOption: "USER_ENTERED",
                data: args
            }
        })
    }

    /*********************************
     ** Get Data
     * Returns a response object
     * The key properties are:
     * response.data.values = an array of values returned representing the range of cells retrieved
     * response.data.range = the A1 notation of the range returned
     * * response.data.majorDimension = ROWS or COLUMNS
     **********************************/
    getData(ranges, field_masks) {
        var fields = "valueRanges(values)"
        return this._sheetsApi.spreadsheets.values.batchGet({
            spreadsheetId: this.spreadsheetId,
            fields: fields,
            ranges: ranges
        })
    }
    updateCells(range, arrayOfArrayValues) {
        if (typeof arrayOfArrayValues == "string") {
            arrayOfArrayValues = [
                [arrayOfArrayValues]
            ];
        }
        else if (!Array.isArray(arrayOfArrayValues[0])) {
            arrayOfArrayValues = [arrayOfArrayValues];
        }
        return this._sheetsApi.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: range,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: arrayOfArrayValues
            }
        })
    }




    // Params:
    // "range": {
    //        sheetId: 0
    //      }
    //  In criteria, the key for each object is the column to be looked at, starting at index 0. So A is 0, B is 1, C is 2, and so on:

    //"criteria": {
    //        2: {
    //          "hiddenValues": ["Aidan"]
    //        }
    //      }
    setBasicFilter(range, criteria) {
        let requests = [];
        requests.push({
            "setBasicFilter": {
                "filter": {
                    "range": range,
                    "criteria": criteria
                }
            },
        });

        return this._sheetsApi.spreadsheets.batchUpdate({
            spreadsheetId: this.spreadsheetId,
            "resource": {
                requests
            }
        })
    }


    getRowsHiddenByFilter(callback) {
        var fields = "sheets(data(rowMetadata(hiddenByFilter)),properties/sheetId)";
        let hiddenRows = [];
        var self = this;
        var worksheetId = this.worksheetId;
        this._sheetsApi.spreadsheets.get({
            fields: fields,
            spreadsheetId: this.spreadsheetId
        }, function(error, response) {

            let sheets = response.data.sheets;
            for (var i = 0; i < sheets.length; i++) {
                if (sheets[i].properties.sheetId == worksheetId) {
                    var data = sheets[i].data;
                    var rows = data[0].rowMetadata;
                    for (var j = 0; j < rows.length; j++) {
                        if (rows[j].hiddenByFilter) hiddenRows.push(j);
                    }
                }
            }
            var ranges = []
            hiddenRows.forEach(function(row) {
                row = row + 1;
                var range = "A" + row + ":" + "I" + row;
                ranges.push(range);
            })

            var results = self.getData(ranges).then(function(result) {
                var rows = []
                result.data.valueRanges.forEach(function(valueRange) {
                    rows.push(valueRange.values[0])
                })
                callback(rows);

            }, function(error) {
                callback(error)
            })
        })
    }
    // wordsToMatch is an array of words to match
    // column is the column letter, A B C etc.
    getRowsIfColumnMatches(wordsToMatch, column, callback) {
        var self = this;
        var range = {
            sheetId: this.worksheetId
        }
        var criteria = {};
        criteria[this.getColumnNumber[column]] = {
            "hiddenValues": wordsToMatch
        }

        this.setBasicFilter(range, criteria).then(function(result) {
            self.getRowsHiddenByFilter(callback);
        }, function(error) {
            console.log(error)
        })
    }
}
