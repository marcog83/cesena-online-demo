var express = require('express');
var router = express.Router();
const intl = require('../../intl/intl');
const {initAuth}=require("./manager");


module.exports = initAuth;