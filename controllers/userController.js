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
    // DELETE user by id
    deleteUser(req, res) { 
        User.findOneAndRemove({ _id: req.params.userId })
        .then((userData) => {
            if (!userData) {
                return res.status(404).json({message: 'No user found with that ID' });
            } else {
            return Thought.deleteMany({ _id: { $in: userData.thoughts } }); // BONUS: delete user's associated thoughts
            }
        })
        .then(() => {
            res.json({ message: 'User deleted, along with associated thoughts.' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // update (PUT) user by id
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
    },
    // POST new friend to User by id
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true })
        .then((userData) => {
            if (!userData) {
                return res.status(404).json({message: 'No user found with that ID'});
            } else {
                res.json(userData);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // DELETE friend from User by id
    unFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },
            { $pull: { friends: req.params.friendId } }
            )
        .then((userData) => {
            if (!userData) {
                return res.status(404).json({message: 'No user found with that ID'});
            } else {
                res.json(userData); // BUG: userData still shows friendId in this response, but it IS being deleted
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};

module.exports = userController;