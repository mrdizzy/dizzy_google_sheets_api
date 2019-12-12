const { google } = require("googleapis");

module.exports = class Sheets {

    constructor(spreadsheetId, JWTcredentials) {

        const jwt = new google.auth.JWT(JWTcredentials.client_email, null, JWTcredentials.private_key, "https://www.googleapis.com/auth/spreadsheets")
        this._sheetsApi = google.sheets({
            version: "v4",
            auth: jwt
        });
        this.spreadsheetId = spreadsheetId;
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
        return new Promise((resolve, reject) => {
            this._sheetsApi.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: range,
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: arrayOfArrayValues
                }
            }, (error, response) => {
                if (error) { reject(new Error("The api threw an error" + error)) }
                resolve(response);
            })
        })

    }
    getData(range) {
        return new Promise((resolve, reject) => {
            this._sheetsApi.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: range
            }, (error, response) => {
                if (error) reject(new Error("The API returned an error: " + error));
                resolve(response.data.values)
            })
        })

    }
}
