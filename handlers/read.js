'use strict';
const { readItems } = require('../utils/dynamoHelper');

module.exports.get = async event => {
  const { tableName } = JSON.parse(JSON.stringify(event.queryStringParameters));
  const tableResponse = await readItems(tableName);

  return tableResponse;
};