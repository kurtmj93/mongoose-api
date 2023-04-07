// require schema from mongoose
const { Schema } = require('mongoose');

// require formatDate util for getter in createdAt
const { formatDate } = require('../utils/formatDate');

// define Reaction schema
const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlegnth: 280,
    },
    username: [
        {
        type: Schema.Types.String, 
        ref: 'User',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        // getter method formats the date on query
        get: date => formatDate(date)
    },
  },
  {
    timestamps: true,
    toJSON: {
        getters: true,
    }
  }
);

// `this will not be a model` (from instructions) - just export reactionSchema
module.exports = reactionSchema;