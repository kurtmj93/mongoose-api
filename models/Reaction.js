// require schema and model from mongoose
const { Schema, model } = require('mongoose');

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
        // TODO: Use a getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
        getters: true,
    }
  }
);

// `this will not be a model` (from instructions) - just export reactionSchema
module.exports = reactionSchema;