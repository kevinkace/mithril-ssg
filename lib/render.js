// use a mock DOM so we can run mithril on the server
require("mithril/test-utils/browserMock")(global);

const mnr = require("mithril-node-render");

const log = require("./log");

module.exports = function render(files) {
    return Promise.all(files.map(file => {
        log("rendering", file.filePath);

        return mnr(file.content)
            .then(rendered => Object.assign(file, { rendered }));
    }));
};
