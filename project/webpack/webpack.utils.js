const path = require("path");

const resolve = function() {
    const cwd = process.cwd();
    return path.resolve(cwd, ...arguments);
}

exports.resolve = resolve;