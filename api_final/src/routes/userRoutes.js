const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController.js');
const auth = require('../middlewares/authMiddlewares.js');

router.post('/', ctrl.create);

router.get('/', auth, ctrl.list);

router.put('/:id', auth, ctrl.updateName);

router.delete('/:id', auth, ctrl.remove);

router.get('/me', auth, ctrl.getProfile);
router.put('/me', auth, ctrl.updateProfile);
router.delete('/me', auth, ctrl.deleteProfile);

module.exports = router;