const { Thought , User } = require('../models')

module.exports = {
    //Get all thoughts
    async getThoughts(req, res){
        try {
            const data = await Thought.find()
            res.json(data)    
        } 
        catch (err) 
        {
            res.status(500).json(err)
        }
    },
    //Get a single thought by ID
    async getSingleThought(req, res){
        try{
            const data = await Thought.findById(req.params.thoughtId)
            !data 
            ? res.status(404).json({message: 'No thought found with given ID!'})
            : res.json(data)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //Post a new thought (and push the resulting ID into the corresponding user)
    async createThought(req, res){
        try{
            const newThought = await Thought.create(req.body)
            //Finds a User specified by the req.body after the thought is created,
            //Then pushes the new thought into the User's array.
            await User.findOneAndUpdate({username: req.body.username}, {$push: {thoughts: [newThought]}})
            res.json(newThought) 
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //Update a single thought by ID
    async updateThought(req, res){
        try{
            //Only the thoughtText portion should be updatable. The username shouldn't be changeable via this function.
            const updateThought = await Thought.findByIdAndUpdate(req.params.thoughtId, 
                {thoughtText: req.body.thoughtText}, { runValidators: true, new: true })
            !updateThought 
            ? res.status(404).json({message: 'No thought found with given ID!'})
            : res.json(updateThought)
        }
        catch(err){
            return res.status(500).json(err)  
        }
    },
    //Delete a single thought by ID
    async deleteThought(req, res){
        try {
            const badThought = await Thought.findByIdAndDelete(req.params.thoughtId)
            !badThought
            ? res.status(404).json({message: 'No thought found with given ID!'})
            : await User.findOneAndUpdate({username: badThought.username}, {$pull: {thoughts: req.params.thoughtId}})
            res.json(badThought)
        } 
        catch (err) {
            return res.status(500).json(err) 
        }
    },
    //Post a new Reaction in a single thought's reactions array
    async addReaction(req, res){
        try {
            const addReact = await Thought.findByIdAndUpdate(req.params.thoughtId,
                {$addToSet: {reactions: req.body}},
                { runValidators: true, new: true })
            !addReact
            ? res.status(404).json({message: 'No thought found with given ID!'})
            : res.json(addReact)
        } 
        catch (err) {
            return res.status(500).json(err) 
        }
    },
    //DELETE to pull and remove a reaction by the reaction's reactionId value
    async removeReaction(req, res){
        try {
            const badReact = await Thought.findByIdAndUpdate(req.params.thoughtId,
                //Pull the reaction from the reactions array in reference to the reactionId value.
            {$pull: {reactions: {reactionId: req.params.reactionId}}}, { runValidators: true, new: true })
            !badReact
            ? res.status(404).json({message: 'No thought found with given ID!'})
            : res.json(badReact)
        } 
        catch (err) {
            return res.status(500).json(err) 
        }
    }
}