const functions = require('firebase-functions');
const { google } = require("googleapis");
const spreadsheetId = "1H2-Bo6LhYNEs4zUVmLkbH3F0t1mPoCpZMBA1DBap7A8";
let credentials = require("./credentials.json");
const Sheets = require("./sheets");

exports.testPromises = functions.https.onRequest((request, res) => {

    var sheets_api = new Sheets(spreadsheetId, credentials);
    sheets_api.updateCells("G5", ["Mary", "David", "Jane"]).then(response => {
        sheets_api.getData("G9").then(results => console.log(results))
    })

    res.send(200)
})


/*********************************
 ** Get Data
 * Returns a response object
 * The key properties are:
 * response.data.values = an array of values returned representing the range of cells retrieved
 * response.data.range = the A1 notation of the range returned
 * * response.data.majorDimension = ROWS or COLUMNS
 **********************************/
function getData(spreadsheetId, range) {
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: range
        }, (error, response) => {
            if (error) reject(new Error("The API returned an error: " + error));
            resolve(response)
        })
    })
}


/*********************************
 ** Update a range of cells
 * 
 *  Returns a response objectm 
 * data: { spreadsheetId: '1H2-Bo6LhYNEs4zUVmLkbH3F0t1mPoCpZMBA1DBap7A8',
 *    updatedRange: 'Inventory!G5',
 *   updatedRows: 1,
 *  updatedColumns: 1,
 *  updatedCells: 1 }
 **********************************/


// range needs to be in format "A1:A500"
// values need to be an array of arrays, e.g. [["David", "21", "Mexico"], ["Margaret", "38", "New York"], ["Janice", "87", "Oklahoma"]]
// Example:
// appendValuesToSheet("1azYt9zUxNhyacmyoyboS7I9AFEMFE-Fo5gEkkQIOh_8", "A1:D500", [["David", "21", "Mexico"], ["Margaret", "38", "New York"], ["Janice", "87", "Oklahoma"]])

function appendValuesToSheet(spreadsheetId, range, arrayOfArrayValues) {
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: range,
            insertDataOption: "INSERT_ROWS",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: arrayOfArrayValues
            }
        }, (error, response) => {
            if (error) { reject(new Error("The API returned an error: " + error)) }
            else { resolve(response) }
        })
    })
}

// First argument to .then is a function that runs when the promise is resolved 
// Seecond argument to .then is a function that runs when the promise is rejected


// Testing promises
//var a_promise = new Promise(function(resolve, reject) {
//    reject("I failed")
//})

//a_promise.then(function(result, error) {
//    console.log(result + 1)
//    console.log("ERROR", error)
//    return a_promise
//}).then(function(result) {
//    console.log(result + 2)
//    return a_promise
//})


//// Testing spreadsheet actions
//updateCells(spreadsheetId, "G5", [
//    ["Kitchen Roll"]
//]).then(function(response) {
//    console.log(response.data)
//    return getData(spreadsheetId, "G9:G20")
//}, function(error) {
//    res.send(error)
//}).then(function(response) {

//    res.send(response.data.values.toString())
//})
//getData(spreadsheetId, "G9:G10").then(function(response) {
//    console.log(response.data);
//})
//  updateCells(spreadsheetId, "Inventory!G5", [
//      ["Aidan"]
//  ]).then(function(response) {
//      updateCells(spreadsheetId, "Inventory!H5", [
//          ["Light"]
//      ])
//  }).then(function(response) {
//      updateCells(spreadsheetId, "Inventory!H7", [
//          ["Telegraph"]
//      ])
//  })
// appendValuesToSheet(spreadsheetId, "A1:D500", [
//     ["David", "21", "Mexico"],
//     ["Margaret", "38", "New York"],
//     ["Janice", "87", "Oklahoma"]
// ]).then(responseJson => {
//     response.send(200)
// })



// getDataByFilter doesn't work

exports.getDataByFilter = functions.https.onRequest((request, response) => {

    sheets.spreadsheets.values.batchGetByDataFilter({
        spreadsheetId: "1H2-Bo6LhYNEs4zUVmLkbH3F0t1mPoCpZMBA1DBap7A8",
        resource: {
            dataFilters: [{ "a1Range": "B1:B" }]
        }

    }, (error, response) => {
        if (error) {
            console.log("The API returned an error: " + error)
        }
        else {

            const rows = response.data.valueRanges
            console.log(rows[0].valueRange.values)
        }
    })
})
