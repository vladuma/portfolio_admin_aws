'use strict';
const createResponse = require('../utils/createResponse');

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.put = async event => {
  const {tableName, data} = JSON.parse(event.body);
  const tableResponse = await updateItem(tableName, JSON.parse(data));

  return tableResponse;
};

function updateItem(tableName, itemData){
  var params = {
    TableName: tableName,
    Item: itemData
  }

  try {
    return docClient.put(params).promise().then(() => {
      return createResponse(200, `Updated successfully ${tableName}`, params);
    });
  } catch (err) {
    console.error(`Error updating ${tableName}`, err);
    return createResponse(400, `Error updating ${tableName}`, err);
  }
};