const globby = require("globby");

const readFiles  = require("./readFiles");
const render     = require("./render");
const writeFiles = require("./writeFiles");
const handleErrs = require("./handleErrs");

globby("./src/pages/**/*.js")
    .then(readFiles)
    .then(render)
    .then(writeFiles)
    .catch(handleErrs);
