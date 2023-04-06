const router = require('express').Router();

const { getUsers, getOneUser } = require('../../controllers/userController');

router.route('/').get(getUsers);

router.route('/:userId').get(getOneUser);

module.exports = router;