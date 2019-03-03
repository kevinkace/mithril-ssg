const { resolve } = require("path");

const log = require("./log");

module.exports = function readFiles(filePaths) {
    log("found files", filePaths);

    return Promise.all(filePaths.map(filePath => {
        log("reading", filePath);

        return Promise.resolve({
            filePath,
            content : require(resolve(filePath))
        });
    }));
};
