const { resolve } = require("path");
const { readFile : _readFile } = require("fs");
const { promisify } = require("util");

const readFile = promisify(_readFile);

const log = require("./log");

function canRequire(filePath) {
    return /(?:\.js|\.json)$/.test(filePath);
}

async function getContent(filePath) {
    const resolvedPath = resolve(filePath);

    return canRequire(filePath) ?
        Promise.resolve(require(resolvedPath)) :
        readFile(resolvedPath);
}

module.exports = function readFiles(filePaths) {
    log("found files", filePaths);

    return Promise.all(filePaths.map(async filePath => {
        log("reading", filePath);

        const content = await getContent(filePath);

        return Promise.resolve({
            filePath,
            content
        });
    }));
};
