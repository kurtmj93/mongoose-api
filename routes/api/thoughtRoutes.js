const router = require('express').Router();

const { getThoughts, getOneThought, createThought, deleteThought } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getOneThought).delete(deleteThought);

module.exports = router;