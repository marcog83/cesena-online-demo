var express = require('express');
var router = express.Router();
const {getUser, postUser}=require("./manager");
// Create endpoint handlers for /users
router.route('/')
    .post(postUser)
    .get(getUser);