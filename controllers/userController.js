const { User, Thought } = require('../models');

const userController = {
    getUsers(req, res) { 
        User.find()
            .then((dbUsers) => {
                res.json(dbUsers);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('friends')
            .populate('thoughts')
            .then((dbUsers) => {
                res.json(dbUsers);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

module.exports = userController;