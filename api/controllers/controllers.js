'use strict';

var repositories = require('../repositories/repository');
var business = require('../business/business');

exports.checkStatus = function() {
    return repositories.checkStatus();
}