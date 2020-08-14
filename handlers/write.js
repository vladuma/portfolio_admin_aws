'use strict';
const assignId = require('../utils/assign-id');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.post = async event => {
  try {
    const {tableName, data} = JSON.parse(event.body);
    const tableResponse = await createItem(tableName, JSON.parse(data));

    return tableResponse;
  } catch (err) {
    console.error(`Error before writting to table`, err);
    return createResponse(500, `Error before writting to table`, err)
  }
};


function createItem(tableName, itemData){
  var params = {
    TableName: tableName,
    Item: assignId(itemData)
  }

  try {
    return docClient.put(params).promise().then(() => {
      return createResponse(200, `Written successfully to ${tableName}`, params);
    });
  } catch (err) {
    console.error(`Error writting to ${tableName}`, err);
    return createResponse(400, `Error writting to ${tableName}`, err);
  }
};

function createResponse(statusCode, message, data) {
  return {
    statusCode: statusCode,
    body: JSON.stringify({message: message, data: data})
  };
}