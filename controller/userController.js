const { User , Thought } = require('../models')
const { getThoughts } = require('./thoughtController')

module.exports = {
    //Get all users
    async getUsers(req, res){
        try {
            const data = await User.find()
            res.json(data)    
        } 
        catch (err) 
        {
            return res.status(500).json(err)
        }
    },
    //Get a single user by ID
    async getSingleUser(req, res){
        try{
            const data = await User.findById(req.params.userId)
            !data 
            ? res.status(404).json({message: 'No user found with given ID!'})
            : res.json(data)
        }
        catch(err){
            return res.status(500).json(err)
        }
    },
    //Post a new user
    async createUser(req, res){
        try{
            const newUser = await User.create(req.body)
            res.json(newUser)
        }
        catch(err){
            return res.status(500).json(err)    
        }
    },
    //Update a single user by ID
    async updateUser(req, res){
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.userId, 
                {$set: req.body}, { runValidators: true, new: true })
            !updateUser 
            ? res.status(404).json({message: 'No user found with given ID!'})
            //Updates all thoughts created by this user if the username has been changed.
            : await Thought.updateMany({_id: {$in: updateUser.thoughts}}, {username: updateUser.username})
            res.json(updateUser)
        }
        catch(err){
            return res.status(500).json(err)  
        }
    },
    //Delete a single user by ID
    async deleteUser(req, res){
        try {
            const badUser = await User.findByIdAndDelete(req.params.userId)
            !badUser
            ? res.status(404).json({message: 'No user found with given ID!'})
            //Purges all thoughts created by this user.
            : await Thought.deleteMany({_id: {$in: badUser.thoughts}})
            res.json(badUser)
        } 
        catch (err) {
            return res.status(500).json(err) 
        }
    },
    //Post a new friend's ID to a single user's friends list
    async addFriend(req, res){
        try {
            //This is more of a 'Put' function considering we're updating a user's friend list...
            //Why did the challenge ask for it to be a Post route again? :P
            const newFriend = await User.findByIdAndUpdate(req.params.userId, 
                {$push: {friends: req.params.friendId}}, { runValidators: true, new: true })
            !newFriend
            ? res.status(404).json({message: 'One or both IDs are invalid!'})
            : res.json(newFriend)
        } 
        catch (err) {
            return res.status(500).json(err)
        }
    },
    //Delete an ex-friend's ID from a single user's friends list
    async removeFriend(req, res){
        try {
            const byeFriend = await User.findByIdAndUpdate(req.params.userId, 
                {$pull: {friends: req.params.friendId}}, { runValidators: true, new: true })
            !byeFriend
            ? res.status(404).json({message: 'One or both IDs are invalid!'})
            : res.json(byeFriend)
        } 
        catch (err) {
            return res.status(500).json(err)
        }
    }
}