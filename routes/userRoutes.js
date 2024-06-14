const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser, listUsers, searchUser, loginUser } = require('../controller/userController');
const auth = require('../middleware/auth');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.get('/', auth ,listUsers);
router.get('/search', auth , searchUser);

module.exports = router;
