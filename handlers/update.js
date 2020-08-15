'use strict';
const { updateItem } = require('../utils/dynamoHelper');

module.exports.put = async event => {
  const {tableName, data} = JSON.parse(event.body);
  const tableResponse = await updateItem(tableName, JSON.parse(data));

  return tableResponse;
};