// use a mock DOM so we can run mithril on the server
require('mithril/test-utils/browserMock')(global);

const mnr = require("mithril-node-render");

module.exports = function render(files) {
    return Promise.all(files.map(file =>
        mnr(fileContent)
        .then(rendered => Object.assign(file, { rendered }))
    ));
};
