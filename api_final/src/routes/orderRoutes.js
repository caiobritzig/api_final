const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/orderController.js');
const auth = require('../middlewares/authMiddlewares.js');

router.post('/', auth, ctrl.create);
router.get('/', auth, ctrl.list);
router.get('/:id', auth, ctrl.getById);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;