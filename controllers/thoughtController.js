const {Thought, User} = require('../models')

module.exports = {
    getThoughts(req, res){
        Thought.find()
        .then((thought) => 
        res.json({
          thought,
        }))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json({
                  thought,
                })
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },


      createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate({_id:req.body.userId}, {$push:{thoughts:thought._id}}, {new:true})
          })
          .then(data => res.json(data))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err)});
      },
};