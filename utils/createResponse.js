
module.exports = (statusCode, message, data) => {
    return {
      statusCode: statusCode,
      body: JSON.stringify({message: message, data: data})
    };
  };