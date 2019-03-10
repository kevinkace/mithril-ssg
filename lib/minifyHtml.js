const globby   = require("globby");
const posthtml = require("posthtml");
const htmlnano = require("htmlnano");

// const processor = posthtml([ htmlnano() ]);

const readFiles  = require("./readFiles");
const writeFiles = require("./writeFiles");

function process(files) {
    return files.map(file =>
        Object.assign(file, {
            processed : posthtml().use(htmlnano()).process(file.content, { sync : true }).html
        })
    );
}

module.exports = function minifyHtml() {
    return globby("/dist/**/*.html")
        .then(readFiles)
        .then(process)
        .then(writeFiles);
};
