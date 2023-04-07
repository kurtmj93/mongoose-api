const { User, Thought } = require('../models');

const thoughtController = {
    getThoughts(req, res) { 
        Thought.find()
            .then((thoughtData) => {
                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate('reactions')
            .then((thoughtData) => {
                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => { 
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: thoughtData._id }},
                    { new: true }
                );
            })
            .then((userData) => {
                res.json({message: 'Thought created for user with id: ' + userData._id })
            }) // this .then is pulling what's being returned from the above, rather than the original thoughtData pushed by the req
            .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
            });
    }
};

module.exports = thoughtController;