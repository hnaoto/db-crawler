var express = require('express');
var router = express.Router();


var Fantasy = require('../lib/fantasy');
var fantasy = new Fantasy();
router.get('/data', fantasy.getAllPlayers);



module.exports = router;
