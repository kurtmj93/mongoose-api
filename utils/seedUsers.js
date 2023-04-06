const db = require('../config/connection');
const { User } = require('../models');


const seedUsers = [
    {
        username: 'CharlesinCharge',
        email: 'charles@incharge.org'
    },
    {
        username: 'EdgarAllen',
        email: 'poe@poemuseum.org'
    }
];


db.on('error', (err) => err);
db.once('open', async () => {
    console.log('db connected');
    await User.deleteMany({});
    await User.collection.insertMany(seedUsers)
    console.log('db seeded with users');
    process.exit(0);
});