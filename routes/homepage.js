const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	res.send("Herro World")
});

module.exports = router;