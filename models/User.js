// require schema and model from mongoose
const { Schema, model } = require('mongoose');

// define User schema
const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is invalid.'],
    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
        },
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User',
        },
    ],
  },
  {
    toJSON: {
        virtuals: true,
    }
  }
);

// add friendCount virtual
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


// compile & export User model
const User = model('User', userSchema);
module.exports = User;
