const globby   = require("globby");
const posthtml = require("posthtml");
const htmlnano = require("htmlnano");

const readFiles  = require("./readFiles");
const writeFiles = require("./writeFiles");

function processor(content) {
    return posthtml()
        .use(htmlnano())
        .process(content, { sync : true })
        .html;
}

function process(files) {
    return files.map(file =>
        Object.assign(file, {
            rendered : processor(file.content)
        })
    );
}

module.exports = function minifyHtml() {
    return globby("/dist/**/*.html")
        .then(readFiles)
        .then(process)
        .then(writeFiles);
};
