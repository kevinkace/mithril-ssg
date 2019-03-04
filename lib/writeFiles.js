const util = require("util");
const { writeFile : _writeFile } = require("fs");

const writeFile = util.promisify(_writeFile);

const log = require("./log");

function destination(file) {
    return file.filePath.replace("/src/pages/", "/dist/").replace(/\.js$/, ".html");
}

module.exports = async function writeFiles(files) {
    return Promise.all(files.map(file => {
        const dest = destination(file);

        log("writing", dest);

        return writeFile(dest, "<!doctype html>\n".concat(file.rendered), "utf8");
    }));
};
