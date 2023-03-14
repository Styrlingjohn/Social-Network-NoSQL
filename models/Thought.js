const { Schema, model} = require('mongoose');
const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type:String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now
            // timestamp getter

        },
        username: {
            type:String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

thoughtSchema
  .virtual('getReactions')
  .get(function () {
    return this.reactions.length;
  });


  const Thought = model('thought', thoughtSchema);

  module.exports = Thought;
