var jsonfile = require('jsonfile');
var snappy = require('snappy');
var fs = require('fs');

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
    var obj = opts['instance'] || g_Project;
    for (id in obj['authors']) {
        ___compress(obj['authors'][id]);
    }
    jsonfile.writeFileSync(opts['path'] || './.ath.json', obj);
}

function __load(opts) {
    opts = opts || {};
    var pth = opts['path'] || './.ath.json';
    if (!__exists(pth)) {
        if (opts['noCreate']) return false;
        var o = __init();
        __save({ 'instance': o, 'path' : pth });
    }
    var obj = jsonfile.readFileSync(pth);
    for (id in obj['authors']) {
        ___decompress(obj['authors'][id]);
    }
    if (opts['instance'])
        opts['instance'] = obj;
    else
        g_Project = obj;
}

function ___compress(obj, opts) {
    opts = opts || {};
    obj = obj || {};
    obj['name'] = snappy.compressSync(obj['name'] || '').toString('utf8');
    obj['nick'] = snappy.compressSync(obj['nick'] || '').toString('utf8');
    obj['mail'] = snappy.compressSync(obj['mail'] || '').toString('utf8');
    obj['wbpg'] = snappy.compressSync(obj['wbpg'] || '').toString('utf8');
}

function ___decompress(obj, opts) {
    opts = opts || {};
    obj = obj || {};
    obj['name'] = snappy.uncompressSync(new Buffer(obj['name'] || ''), { 'asBuffer': false });
    obj['nick'] = snappy.uncompressSync(new Buffer(obj['nick'] || ''), { 'asBuffer': false });
    obj['mail'] = snappy.uncompressSync(new Buffer(obj['mail'] || ''), { 'asBuffer': false });
    obj['wbpg'] = snappy.uncompressSync(new Buffer(obj['wbpg'] || ''), { 'asBuffer': false });
}

function __exists(path) {
    try {
        fs.statSync(path);
    } catch (e) {
        return false;
    }
    return true;
}