const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} filePath The file you want to write to.
 *  @param {object} data The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (filePath, data) =>
  fs.writeFile(filePath, JSON.stringify(data, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${filePath}`)
  );

/**
 *  Function to read data from a given file and append some content
 *  @param {object} newData The content you want to append to the file.
 *  @param {string} filePath The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (newData, filePath) => {
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(fileData);
      parsedData.push(newData);
      writeToFile(filePath, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
