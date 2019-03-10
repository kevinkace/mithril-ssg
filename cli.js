#!/usr/bin/env node

const mithrilSsg = require("./");

const args = process.argv.slice(2); // drop node exe and curr script

console.log(args);

mithrilSsg({ production : args.includes("-p") });
