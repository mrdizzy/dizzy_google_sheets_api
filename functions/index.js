const functions = require('firebase-functions');
const {
  google
} = require("googleapis");
const spreadsheetId = "1H2-Bo6LhYNEs4zUVmLkbH3F0t1mPoCpZMBA1DBap7A8";
let credentials = require("./credentials.json");
const Sheets = require("./sheets");

exports.testPromises = functions.https.onRequest((request, res) => {

  var sheets_api = new Sheets(spreadsheetId, 0, credentials);
  //  sheets_api.updateCells("G5", ["Mary", "David", "Jane"]).then(response => {
  //        sheets_api.batchUpdate()
  //      
  //        res.send(200)
  //      
  //  })#
  //sheets_api.getData("A1:C100").then(function(response) {
  //  console.log(response.data.values)
  //})
  //  sheets_api.getIndexesOfFilteredRows()
  //  var result = sheets_api.batchUpdateCells("range")
  //  result.then(function(result) {
  //    console.log(result)
  //  },function(error) {
  //    console.log(error)
  //  })
 
 // rows_hidden.then(function(result) {
 //   console.log(result.data.sheets[0].data)
 // }, function(error) {})
  sheets_api.getRowsIfColumnMatches(["Sentimental"], "C", function(rows) {
    console.log(rows)
  });
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


