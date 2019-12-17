const functions = require('firebase-functions');
const {
  google
} = require("googleapis");


const spreadsheetId = "1H2-Bo6LhYNEs4zUVmLkbH3F0t1mPoCpZMBA1DBap7A8";
let credentials = require("./credentials.json");
const Sheets = require("./sheets");

exports.testPromises = functions.https.onRequest((request, res) => {
  
  var sheets_api = new Sheets(spreadsheetId, 0, credentials);
  sheets_api.getRowsIfColumnMatches(["GM10"], "B", function(response) {
    console.log(response);
  })
  res.send(200)
})





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