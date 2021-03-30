const express = require('express');
const router = express.Router();
const stackController = require('../../controllers/stack.controller');

router.get('', stackController.pop);
router.post('', stackController.push);

module.exports = router;