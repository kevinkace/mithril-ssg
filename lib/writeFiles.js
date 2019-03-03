const util = require("util");
const { mkdir : _mkdir, writeFile : _writeFile } = require("fs");

const mkdir     = util.promisify(_mkdir);
const writeFile = util.promisify(_writeFile);

const rmfr = require("rmfr");

const log = require("./log");

function destination(file) {
    return file.filePath.replace("/src/pages/", "/dest/").replace(/\.js$/, ".html");
}

module.exports = async function writeFiles(files) {
    log("deleting", "/dest");

    await rmfr("./dest");
    await mkdir("./dest");

    return Promise.all(files.map(file => {
        const dest = destination(file);

        log("writing", dest);

        return writeFile(dest, "<!doctype html>\n".concat(file.rendered), "utf8");
    }));
};
