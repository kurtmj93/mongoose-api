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
            res.json({ message: 'Thought deleted.' });
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
    // POST reaction to thought by thought id
    createReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            {   $addToSet: { reactions: req.body } }, 
            { 
                runValidators: true,
                new: true 
            })
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({message: 'No thought exists with that id.'})
                } else {
                    res.json(thoughtData);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // DELETE reaction to thought by reaction id
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}})
        .then((thoughtData) => {
            if (!thoughtData) {
                return res.status(404).json({message: 'No thought found with that ID' });
            } else {
                return res.json({message: 'Reaction deleted.'});
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};

module.exports = thoughtController;