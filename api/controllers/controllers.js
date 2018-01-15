'use strict';

var repositories = require('../repositories/repository');
var business = require('../business/business');

exports.getData = function(req,res) {
    return repositories.getData();
}