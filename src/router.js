const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { message: 'Hello Node.js' });
});

module.exports = router;
