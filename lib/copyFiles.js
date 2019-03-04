const { promisify }            = require("util");
const { copyFile : _copyFile } = require("fs");
const { resolve }              = require("path");

const copyFile = promisify(_copyFile);

const log = require("./log");

function destination(filePath) {
    return filePath.replace("/src/assets/", "/dist/");
}

module.exports = function copyfiles(filePaths) {
    log("copying", filePaths);

    return Promise.all(filePaths.map(filePath =>
        copyFile(resolve(filePath), destination(filePath))
    ));
};
