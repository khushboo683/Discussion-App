const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser, listUsers, searchUser, loginUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.get('/', listUsers);
router.get('/search', searchUser);

module.exports = router;
