const { User, Thought } = require('../models');

const thoughtController = {
    getThoughts(req, res) { 
        Thought.find()
            .then((dbThoughts) => {
                res.json(dbThoughts);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

module.exports = thoughtController;