///<reference path='../../definitions/q/Q.d.ts' />

var fs = require('fs');
var q = require('q');

var me = module.exports;

me.spaces = 2;

var readFileQ = q.nfbind(fs.readFile);

var writeFileQ = q.nfbind(fs.writeFile);

exports.readFileSync = function(file: string): any {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
};

