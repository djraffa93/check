const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/:id', jwtMiddleware, UsersController.getUser);
router.put('/:id', jwtMiddleware, UsersController.updateUser);
router.delete('/:id', jwtMiddleware, UsersController.deleteUser);

module.exports = router;