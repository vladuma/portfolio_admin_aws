'use strict';
const { deleteItem } = require('../utils/dynamoHelper');

module.exports.del = async event => {
  const {tableName, data} = JSON.parse(event.body);
  const tableResponse = await deleteItem(tableName, JSON.parse(data));

  return tableResponse;
};