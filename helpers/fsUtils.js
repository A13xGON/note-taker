const fs = require('fs/promises');


async function readFromFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading from file:', error);
        throw error; // Rethrow to handle the error in calling functions
    }
}


async function writeToFile(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 4));
        console.info(`Data written to ${filePath}`);
    } catch (error) {
        console.error('Error writing to file:', error);
        throw error;
    }
}


async function readAndAppend(newData, filePath) {
    try {
        const fileData = await readFromFile(filePath);
        fileData.push(newData);
        await writeToFile(filePath, fileData);
    } catch (error) {
        console.error('Error appending to file:', error);
        throw error;
    }
}

module.exports = { readFromFile, writeToFile, readAndAppend };
