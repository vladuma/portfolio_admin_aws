'use strict';

module.exports.put = async event => {
  const {dbName, data} = JSON.parse(JSON.stringify(event || event.body));

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Updated successfully: ${dbName}`,
        input: event,
      },
      null,
      2
    ),
  };
};
