const { User, Thought } = require('../models');

const userController = {
    // GET all users
    getUsers(req, res) { 
        User.find()
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // GET one user by id
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('friends')
            .populate('thoughts')
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // POST new user
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => { res.json(userData) })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
        .then((userData) => {
            if (!userData) {
                return res.status(404).json({message: 'No user found with that ID' });
            } else {
            res.json({ message: 'User with id ' + userData._id + ' deleted' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },
            {   $set: req.body }, 
            { 
                runValidators: true,
                new: true 
            })
        .then((userData) => {
            if (!userData) {
                return res.status(404).json({message: 'No user found with that ID' });
            } else { 
                res.json(userData);
            } 
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};

module.exports = userController;