const globby = require("globby");

const readFiles  = require("./lib/readFiles");
const render     = require("./lib/render");
const writeFiles = require("./lib/writeFiles");
const handleErrs = require("./lib/handleErrs");

module.exports = function mithrilSsg(glob = "./src/pages/**/*.js") {
    return globby(glob)
        .then(readFiles)
        .then(render)
        .then(writeFiles)
        .catch(handleErrs);
};
