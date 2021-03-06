'use strict';
const colors = require('colors');
const util = require('util');
const readFileSync = require('fs').readFileSync;

const TEA = readFileSync(__dirname + '/../art/tea.ascii');
const SUPERMAN = readFileSync(__dirname + '/../art/superman.ascii');

const colorMap = new Map([
	['verbose', null],
	['info', null],
	['warn', 'yellow'],
	['error', 'red'],
	['success', 'green']
]);

const asciiArt = new Map([
	['tea', TEA],
	['superman', SUPERMAN]
]);

function writelog(str, color){
	if(color){
		str = colors[color](str);
	}

	console.log(str);
}

function isArray(val){
	return val instanceof Array || typeof val === 'object' && val !== null && val.push && val.pop;
}

function toString(v){
	return typeof v === 'object' ? util.inspect(v, {depth:null}) : String(v);
}

function combineArgs(args){
	if(!isArray(args)){
		return toString(args);
	}

	return args.reduce((previous, current) => {
		let val;
		if(typeof current === 'object'){}
		val = toString(current);
		return previous + '\n' + val;
	}, '');
}

module.exports = function(opts){
	let options = Object.assign(
		{
			verbose : false,
			disabled : false
		},
		opts
	);

	let logger = {};

	for(let item of colorMap){
		if(options.disabled || item[0] === 'verbose' && !options.verbose){
			logger[item[0]] = function(){};
			continue;
		}

		logger[item[0]] = (args) => writelog(combineArgs(args), item[1])
	}

	logger.art = options.disabled ? function(){} : (art, context) => {
		let color = colorMap.get(context);
		let ascii = asciiArt.get(art);
		let output = color ? colors[color](ascii) : ascii;
		console.log(output);
	};

	return logger;
};
