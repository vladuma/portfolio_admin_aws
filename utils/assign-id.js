const { uuid } = require('uuidv4');

module.exports = (data) => {
    data.id = uuid();

    return data;
};