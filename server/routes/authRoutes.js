const { Router } = require('express');
const { authenticateByToken } = require('../middlewares/tokenAuth');
const {
  authenticate,
  login,
  register,
  logout
} = require('../controllers/authController');


const router = Router();

router.get('/', authenticateByToken, authenticate);

router.post('/login', login);

router.post('/register', register);

router.post('/logout', authenticateByToken, logout);

module.exports = router;