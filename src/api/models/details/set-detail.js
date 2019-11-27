const { succesProcess, errorProcess } = require("../../utils/default-responses");
var AWS = require("aws-sdk");
const { awsConfig } = require("../../../config/vars");
const monthNames = ["Ene", "Feb", "Mar", "April", "Mayo", "Jun",
    "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"];

function setDetails(req, res, idUser) {
    let date = new Date()
    const { phone, duration, intents, last_stage, last_step } = req.body;
    AWS.config.update(awsConfig);
    let docClient = new AWS.DynamoDB.DocumentClient();

    var seteableDetails = {
        "date": `${date.getUTCDay()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`,
        "duration": duration,
        "hour": `${date.getHours()}: ${date.getMinutes()}`,
        "idDetails": `${date}`,
        "idUser": idUser,
        "intents": intents,
        "last_stage": last_stage,
        "last_step": last_step,
        "phone": phone
    }

    var params = {
        TableName: "Omni-details",
        Item: seteableDetails
    };
    docClient.put(params, function (err, data) {

        if (err) {
            res.json(errorProcess(err))
        } else {
            res.json(succesProcess("Success save details", data))
        }
    });
}

module.exports = setDetails;