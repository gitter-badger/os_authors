#! /usr/bin/env node

var os_authors = require('../index.js');
var yargs = require('yargs');

function _getCommand() {
    for (id in yargs.argv._) {
        switch (yargs.argv._[id]) {
            case 'init':
                return 'init';
            case 'add':
                return 'add';
            default:
                return null;
        }
    }
}

var g_Authors = os_authors.init();
var g_Path = yargs.argv['path'] || process.cwd();
var g_Cmd = _getCommand();

if (g_Cmd == null) {
    process.exit(1); // print usage
}

os_authors.load({ 'path': (g_Path + '/.ath.json'), 'instance': g_Authors });



os_authors.save({ 'path': (g_Path + '/.ath.json'), 'instance': g_Authors });