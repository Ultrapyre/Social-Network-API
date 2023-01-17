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
    getSingleThought(req, res){

    },
    //Post a new thought (and push the resulting ID into the corresponding user)
    createThought(req, res){

    },
    //Update a single thought by ID
    updateThought(req, res){

    },
    //Delete a single thought by ID
    deleteThought(req, res){

    },
    //Post a new Reaction in a single thought's reactions array
    addReaction(req, res){

    },
    //DELETE to pull and remove a reaction by the reaction's reactionId value
    removeReaction(req, res){

    }
}