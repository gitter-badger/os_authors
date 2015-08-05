#! /usr/bin/env node

var os_authors = require('../index.js');
var yargs = require('yargs');

var g_Authors = os_authors.init();
var g_Path = yargs.argv['path'] || process.cwd();

os_authors.load({ 'path': (g_Path + '/.ath.json'), 'instance': g_Authors });


os_authors.save({ 'path': (g_Path + '/.ath.json'), 'instance': g_Authors });