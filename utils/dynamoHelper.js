
const { uuid } = require('uuidv4');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const createResponse = require('./createResponse');

module.exports = {
    createItem(tableName, itemData) {
        const params = {
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
        const params = {
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
    readItem(tableName, id) {
        const params = {
            TableName: tableName,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': id
            }
        }
      
        try {
          return docClient.query(params).promise().then((data) => {
            return createResponse(200, `${id} Read successfully from ${tableName}`, data);
          }).catch(err => createResponse(500, `Error reading ${id} from ${tableName}`, err));
        } catch (err) {
          console.error(`Error reading ${id} from ${tableName}`, err);
          return createResponse(400, `Error reading ${id} from ${tableName}`, err);
        }
    },
    updateItem(tableName, itemData) {
        const params = {
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
        const params = {
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
    },
    listTables() {
        try {
            return dynamodb.listTables().promise().then((data) => {
                return createResponse(200, `Listing tables`, data);
            }).catch(err => createResponse(500, `Error listing tables`, err));
        } catch (err) {
            console.error(`Error listing tables`, err);
            return createResponse(400, `Error listing tables`, err);
        }
    },
    describeTable(tableName) {
        const params = {
            TableName: tableName
        }
        
        try {
            return dynamodb.describeTable(params).promise().then((data) => {
                return createResponse(200, `Describing table ${tableName}`, data);
            }).catch(err => createResponse(500, `Error describing table ${tableName}`, err));
        } catch (err) {
            console.error(`Error describing table ${tableName}`, err);
            return createResponse(400, `Error describing table ${tableName}`, err);
        }
    }
}

const assignId = (data) => {
    data.id = uuid();
  
    return data;
}