module.exports = {
    init    : __init,
    add     : __add,
};

var g_Project = __init();

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

function __init(opts) {
    opts = opts || {};
    return {
        'meta'      : opts['meta']     || {},
        'authors'   : opts['authors']  || [],
    };
}