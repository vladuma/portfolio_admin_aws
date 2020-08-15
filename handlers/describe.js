'use strict';
const { describeTable } = require('../utils/dynamoHelper');

module.exports.get = async event => {
  const {tableName} = JSON.parse(JSON.stringify(event.queryStringParameters));
  const tableResponse = await describeTable(tableName);

  return tableResponse;
};