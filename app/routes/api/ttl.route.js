const express = require('express');
const router = express.Router();
const ttlController = require('../../controllers/ttl.controller');

router.get('', ttlController.getByKey);
router.post('', ttlController.store);
router.delete('', ttlController.delete);

module.exports = router;
