'use strict';

module.exports.get = async event => {
  const { dbName } = JSON.parse(JSON.stringify(event.queryStringParameters));

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Read successfully from ${dbName}`,
        input: event.queryStringParameters,
      },
      null,
      2
    ),
  };
};
