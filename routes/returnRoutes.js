const express = require('express');
const router = express.Router();
const returnController = require('../controllers/returnController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, returnController.createReturn);
router.get('/', authMiddleware, returnController.getReturnsByUser);

module.exports = router;
