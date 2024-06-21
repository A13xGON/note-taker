const router = require('express').Router(); 

const ntRouter = require('./notes'); 

router.use('/notes', ntRouter); 

module.exports = router; 