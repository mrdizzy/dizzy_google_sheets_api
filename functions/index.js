const functions = require('firebase-functions');
const { google } = require("googleapis");
let credentials = require("./credentials.json");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


const jwt = new google.auth.JWT(credentials.client_email, null, credentials.private_key, "https://www.googleapis.com/auth/spreadsheets")

const sheets = google.sheets({
    version: "v4",
    auth: jwt
});



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

exports.testPromises = functions.https.onRequest((request, response) => {
    appendValuesToSheet("1uFsDidKOKf8NBrUtX_ZnHn2zvVGbxDxkU0z259MCAP4", "A1:D500", [
        ["David", "21", "Mexico"],
        ["Margaret", "38", "New York"],
        ["Janice", "87", "Oklahoma"]
    ]).then(responseJson => {
        response.send(200)
    })

})



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
