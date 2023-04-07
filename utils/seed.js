const db = require('../config/connection');
const { User, Thought } = require('../models');

/* SEED DIDN'T WORK AS INTENDED, SEE ISSUE BELOW
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

const seedThoughts = [
    {
        thoughtText: 'what are you on about, m8',
        username: 'CharlesinCharge'
    },
    {
        thoughtText: 'nevermore',
        username: 'EdgarAllen'
    }
];
*/ 

db.on('error', (err) => err);
db.once('open', async () => {
    console.log('db connected');
    await User.deleteMany({});
    await Thought.deleteMany({});
    /* await User.collection.insertMany(seedUsers);
    await Thought.collection.insertMany(seedThoughts); */
    console.log('db cleared');
    process.exit(0);
});

/* ISSUE: This method of seeding is not creating the reference 
or giving ownership of the thought to the created User,
but seeding isn't required by acceptance criteria - just 
for testing simple GET routes before having POST routes. */