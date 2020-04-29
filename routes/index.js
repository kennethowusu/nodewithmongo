var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) =>  {
	res.render('layouts/main')
});

module.exports = router;