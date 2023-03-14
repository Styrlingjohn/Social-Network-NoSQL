const {Schema, model} = require('mongoose');
const thoughtSchema = require("./Thought");


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            max_length: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
        },
        thoughts: [thoughtSchema],
        friends: [userSchema], 
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

  const User = model('user', userSchema);

  module.exports = User