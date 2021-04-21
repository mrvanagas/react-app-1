const {Router} = require('express');
const {
    getUsers,
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require ('../controllers/userController')

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser)

router.post('/', createUser)

router.put('/:id', update)

router.delete('/:id', update)

module.exports = router