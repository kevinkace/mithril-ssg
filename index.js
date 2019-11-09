const { promisify }      = require("util");
const { mkdir : _mkdir } = require("fs");

const mkdir = promisify(_mkdir);

const rmfr   = require("rmfr");
const globby = require("globby");

const log        = require("./lib/log");
const copyFiles  = require("./lib/copyFiles");
const readFiles  = require("./lib/readFiles");
const render     = require("./lib/render");
const writeFiles = require("./lib/writeFiles");
const handleErrs = require("./lib/handleErrs");

const minifyHtml = require("./lib/minifyHtml");
const minifyCss  = require("./lib/minifyCss");

const state = require("./state");

const dist = "./dist";

async function html(glob = "./src/pages/**/*.js") {
    return globby(glob)
        .then(readFiles)
        .then(render)
        .then(writeFiles)
        .catch(handleErrs);
}

async function assets(glob = "./src/assets/**/*.*") {
    return globby(glob)
        .then(copyFiles)
        .catch(handleErrs);
}

async function minify() {
    return Promise.all([
        minifyHtml(),
        minifyCss()
    ]);
}

module.exports = async function mithrilSsg({ production }) {
    log("deleting", dist);

    state.production = production;

    await rmfr(dist);
    await mkdir(dist);

    return Promise.all([
        html(),
        assets()
    ])
    .then(() => (production ? minify() : null));
};
