'use strict';
const { readItems, readItem } = require('../utils/dynamoHelper');

module.exports.get = async event => {
  const { tableName, itemId } = JSON.parse(JSON.stringify(event.queryStringParameters));
  const tableResponse = await itemId ? readItem(tableName, itemId) : readItems(tableName);

  return tableResponse;
};