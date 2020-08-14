'use strict';

module.exports.post = async event => {
  const {dbName, data} = JSON.stringify(event || event.body);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Written successfully to ${dbName}`,
        input: event,
      },
      null,
      2
    ),
  };
};
