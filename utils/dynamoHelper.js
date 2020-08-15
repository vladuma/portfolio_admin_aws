
const { uuid } = require('uuidv4');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const docClient = new AWS.DynamoDB.DocumentClient();

const createResponse = require('./createResponse');

module.exports = {
    createItem(tableName, itemData) {
        var params = {
          TableName: tableName,
          Item: assignId(itemData)
        }
      
        try {
          return docClient.put(params).promise().then(() => {
            return createResponse(200, `Written successfully to ${tableName}`, params);
          }).catch(err => createResponse(500, `Error writting to ${tableName}`, err));
        } catch (err) {
          console.error(`Error writting to ${tableName}`, err);
          return createResponse(400, `Error writting to ${tableName}`, err);
        }
    },
    readItems(tableName) {
        var params = {
          TableName: tableName
        }
      
        try {
          return docClient.scan(params).promise().then((data) => {
            return createResponse(200, `Read successfully from ${tableName}`, data);
          }).catch(err => createResponse(500, `Error reading from ${tableName}`, err));
        } catch (err) {
          console.error(`Error reading from ${tableName}`, err);
          return createResponse(400, `Error reading from ${tableName}`, err);
        }
    },
    updateItem(tableName, itemData) {
        var params = {
          TableName: tableName,
          Item: itemData
        }
      
        try {
          return docClient.put(params).promise().then(() => {
            return createResponse(200, `Updated successfully ${tableName}`, params);
          }).catch(err => createResponse(500, `Error updating ${tableName}`, err));
        } catch (err) {
          console.error(`Error updating ${tableName}`, err);
          return createResponse(400, `Error updating ${tableName}`, err);
        }
    },
    deleteItem(tableName, data) {
        var params = {
          TableName: tableName,
          Key: data
        }
      
        try {
          return docClient.delete(params).promise().then(() => {
            return createResponse(200, `Deleted successfully ${tableName}`, params);
          }).catch(err => createResponse(500, `Error deleting ${tableName}`, err));
        } catch (err) {
          console.error(`Error deleting ${tableName}`, err);
          return createResponse(400, `Error deleting ${tableName}`, err);
        }
    }
}

const assignId = (data) => {
    data.id = uuid();
  
    return data;
}