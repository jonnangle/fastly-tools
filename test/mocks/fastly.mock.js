'use strict';
var sinon = require('sinon');

var fakeServiceId = '1234567';

function mockPromiseMethod(obj, name, value){
	obj[name] = sinon.stub().returns(Promise.resolve(value));
}

var methods = {
	'getServices': [{id:fakeServiceId}],
	'cloneVersion': {number:1},
	'getVcl': [{name:'blah.vcl'}],
	'deleteVcl' : null,
	'updateVcl' : null,
	'setVclAsMain': null,
	'validateVersion': {status:'ok'},
	'activateVersion': null,
	'createBackend': null,
	'getBackend': [{name:'fake-backend'}],
	'deleteBackendByName': null,
	'getHealthcheck': [{name:'fake-healthcheck'}],
	'deleteHealthcheck' : null,
	'createHealthcheck': null,
	'getConditions': [{name:'fake-condition'}],
	'createCondition': null,
	'deleteCondition': null
};

var mock = {};
var called = false;

module.exports = function(){
	if(called){
		return mock;
	}

	mock = {};
	var func = mockPromiseMethod.bind(null, mock);
	Object.keys(methods).forEach(function(key){
		func(key, methods[key]);
	});

	called = true;
	return mock;
};

module.exports.fakeServiceId = fakeServiceId;
