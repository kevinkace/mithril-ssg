const util     = require("util");
const readFile = util.promisify(require("fs").readFile)

module.exports = function readFiles(filePaths) {
    return Promise.all(filePaths.map(filePath =>
        Promise.resolve({
            filePath,
            content : require(filePath)
        })
    ));
};
