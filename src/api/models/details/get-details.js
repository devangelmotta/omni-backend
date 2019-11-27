const { succesProcess, errorProcess } = require("../../utils/default-responses");
const { awsConfig } = require("../../../config/vars");
const AWS = require('aws-sdk');
AWS.config.logger = console;

function readDynamoDb(res, valueFilter, lastKey) {
    try {
        AWS.config.update(awsConfig);
        const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

        var val = valueFilter;

        var params = {
            TableName: "Omni-details",
            ExpressionAttributeValues: {
                ':idUser': {
                    S: val,
                },
            },
            Limit: 7,
            FilterExpression: 'idUser = :idUser',
            // ExclusiveStartKey: lastKey
        };
        if (lastKey) { return params.ExclusiveStartKey = lastKey }

        dynamodb.scan(params, function scanUntilDone(err, data) {
            if (err) {
                res.json(errorProcess(err))
            } else {
                return res.json(succesProcess("Recovery details", data))
            }
        });
    } catch (error) {
        return res.json(errorProcess(err))
    }

}

module.exports = readDynamoDb;
