var express = require('express');
var router = express.Router();
var fantasy = require('../lib/fantasy');



router.get('/data', fantasy.getOnePlayer);



module.exports = router;
