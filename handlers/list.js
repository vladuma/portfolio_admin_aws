'use strict';
const { listTables } = require('../utils/dynamoHelper');

module.exports.get = async event => {
  const tableResponse = await listTables();

  return tableResponse;
};