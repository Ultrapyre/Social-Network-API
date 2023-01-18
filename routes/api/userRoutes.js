const router = require('express').Router();

//functions pulled from the respective controller
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controller/userController.js')

// api/users/
router.route('/').get(getUsers).post(createUser)

// api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// api/users/:userId/friends/:friendId

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router;