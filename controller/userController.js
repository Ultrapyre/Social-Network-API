const { User } = require('../models')

module.exports = {
    //Get all users
    async getUsers(req, res){
        try {
            const data = await User.find()
            res.json(data)    
        } 
        catch (err) 
        {
            res.status(500).json(err)
        }
    },
    //Get a single user by ID
    getSingleUser(req, res){

    },
    //Post a new user
    createUser(req, res){

    },
    //Update a single user by ID
    updateUser(req, res){

    },
    //Delete a single user by ID
    deleteUser(req, res){

    },
    //Post a new friend's ID to a single user's friends list
    addFriend(req, res){

    },
    //Delete an ex-friend's ID from a single user's friends list
    removeFriend(req, res){

    }
}