// require schema and model from mongoose
const { Schema, model } = require('mongoose');
// require reactionSchema to include
const reactionSchema = require('./Reaction');
// require formatDate util for getter in createdAt
const { formatDate } = require('../utils/formatDate');

// define Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // getter method formats the date on query
        get: date => formatDate(date)
    },
    username: [
        {
        type: Schema.Types.String, 
        ref: 'User',
        }
    ],
    reactions: [reactionSchema]
  },
  {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true
    }
  }
);

// add reactionCount virtual
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// compile & export Thought model
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;