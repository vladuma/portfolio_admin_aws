'use strict';
const { createItem } = require('../utils/dynamoHelper');

module.exports.post = async event => {
  const {tableName, data} = JSON.parse(event.body);
  const tableResponse = await createItem(tableName, JSON.parse(data));

  return tableResponse;
};