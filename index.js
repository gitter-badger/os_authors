var jsonfile = require('jsonfile');

module.exports = {
    init    : __init,
    add     : __add,
    save    : __save,
    load    : __load,
};

var g_Project = __init();

function __init(opts) {
    opts = opts || {};
    return {
        'meta'      : opts['meta'] || {},
        'authors'   : opts['authors'] || [],
    };
}

function __add(name, nick, mail, wbpg, opts) {
    opts = opts || {};
    var obj = {
        'name' : name || '',
        'nick' : nick || '',
        'mail' : mail || '',
        'wbpg' : wbpg || '',
    };
    if (opts['instance'] && opts['instance']['authors'] && Array.isArray(opts['instance']['authors']))
        opts['instance']['authors'].push(obj);
    else
        g_Project['authors'].push(obj);
}

function __save(opts) {
    opts = opts || {};
    var obj = jsonfile.writeFileSync(opts['path'] || './.ath.json', opts['instance'] || g_Project);
}

function __load(opts) {
    opts = opts || {};
    var obj = jsonfile.readFileSync(opts['path'] || './.ath.json');
    if (opts['instance'])
        opts['instance'] = obj;
    else
        g_Project = obj;
}