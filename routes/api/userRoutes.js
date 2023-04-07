const router = require('express').Router();

const { getUsers, getOneUser, createUser, deleteUser, updateUser } = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getOneUser).delete(deleteUser).put(updateUser);

module.exports = router;