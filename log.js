function rightPad(str, len = 12) {
    while (str.length < len) {
        str = str.concat(" ");
    }

    return str;
}

module.exports = function log(lead, path) {
    // console.log(`${rightPad(lead)} ${path}`);
    console.log(rightPad(lead), path);
};
