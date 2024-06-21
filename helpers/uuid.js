const { v4: uuidv4 } = require('uuid');

module.exports = function generateUuid() {
    return uuidv4(); // Generates a standard UUID
};
