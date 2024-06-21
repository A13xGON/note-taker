// Export a function that generates a string of random numbers and letters
module.exports = function generateUuid() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  