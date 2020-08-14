'use strict';

module.exports.del = async event => {
  const {dbName} = JSON.parse(JSON.stringify(event || event.body));

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Deleted successfully: ${dbName}`,
        input: event,
      },
      null,
      2
    ),
  };
};
