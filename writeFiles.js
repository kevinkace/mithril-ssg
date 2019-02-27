const util      = require("util");
const writeFile = util.promisify(require("fs").writeFile);

function destination(file) {
    return file.filePath.replace("src", "dest");
}

module.exports = function writeFiles(files) {
    return Promise.all(files.map(file =>
        writeFile(destination(file), file.rendered, "utf8")
    ));
}
