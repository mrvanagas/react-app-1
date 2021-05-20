const { Router } = require('express');
const { authenticateByToken } = require('../middlewares/tokenAuth');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = Router();

router.get('/', authenticateByToken, getUsers);

router.get('/:id', authenticateByToken, getUser);

router.post('/', authenticateByToken, createUser);

router.put('/:id', authenticateByToken, updateUser);

router.delete('/:id', authenticateByToken, deleteUser);

module.exports = router;




