const util               = require("util");
const { mkdir : _mkdir } = require("fs");

const mkdir = util.promisify(_mkdir);

const rmfr   = require("rmfr");
const globby = require("globby");

const log        = require("./lib/log");
const readFiles  = require("./lib/readFiles");
const render     = require("./lib/render");
const writeFiles = require("./lib/writeFiles");
const handleErrs = require("./lib/handleErrs");

module.exports = async function mithrilSsg(glob = "./src/pages/**/*.js") {
    log("deleting", "/dist");

    await rmfr("./dist");
    await mkdir("./dist");

    return globby(glob)
        .then(readFiles)
        .then(render)
        .then(writeFiles)
        .catch(handleErrs);
};
