'use strict';
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.get = async event => {
  const { tableName } = JSON.parse(JSON.stringify(event.queryStringParameters));
  const tableResponse = await readItems(tableName);

  return tableResponse;
};

function readItems(tableName, itemData){
  var params = {
    TableName: tableName
  }

  try {
    return docClient.scan(params).promise().then((data) => {
      return createResponse(200, `Read successfully from ${tableName}`, data);
    });
  } catch (err) {
    console.error(`Error writting to ${tableName}`, err);
    return createResponse(400, `Error reading from ${tableName}`, err);
  }
};

function createResponse(statusCode, message, data) {
  return {
    statusCode: statusCode,
    body: JSON.stringify({message: message, data: data})
  };
}
