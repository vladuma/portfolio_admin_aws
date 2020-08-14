'use strict';

module.exports.get = async event => {
  const {dbName} = JSON.stringify(event.queryStringParameters || event.body.queryStringParameters);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Read successfully from ${dbName}`,
        input: event,
      },
      null,
      2
    ),
  };
};
