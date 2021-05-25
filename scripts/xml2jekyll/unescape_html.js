#!/usr/bin/env node
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

var document = new JSDOM('<html><head></head><body></body></html>');

fs.readFile(process.argv[2], onReadFile);

function onReadFile(err, data) {
    console.log(htmlDecode(data));
}

function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

