const { User, Thought } = require('../models');

const thoughtController = {
    // GET all thoughts
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
    // GET thought by id
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
    // POST new thought
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
    },
    // DELETE thought by id
    deleteThought(req, res) { 
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thoughtData) => {
            if (!thoughtData) {
                return res.status(404).json({message: 'No thought found with that ID' });
            } else {
            return User.findOneAndUpdate({ thoughts: req.params.thoughtId }, // find a user with thoughtId in its thought array
                { $pull: { thoughts: req.params.thoughtId } } // then pull the thoughtId out of the thought array
                );
            }
        })
        .then(() => {
            res.json({ message: 'Successfully deleted.' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // update (PUT) thought by id
    updateThought(req, res) {   
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            {   $set: req.body }, 
            { 
                runValidators: true,
                new: true 
            })
        .then((thoughtData) => {
            if (!thoughtData) {
                return res.status(404).json({message: 'No thought found with that ID' });
            } else { 
                res.json(thoughtData);
            } 
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // TODO: reaction routes
    createReaction(req, res) {

    },
    deleteReaction(req, res) {

    }
};

module.exports = thoughtController;