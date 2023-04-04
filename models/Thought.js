// require schema and model from mongoose
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    author: [
        {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now
    },
  },
  {
    toJSON: {
        virtuals: true,
    }
  }
);

// compile & export Thought model
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;