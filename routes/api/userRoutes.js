const router = require('express').Router();

//functions pulled from the respective controller
const {} = require('../../controller/userController.js')

// api/users/
router.route('/').get().post()

// api/users/:userId
router.route('/:userId').get().put().delete()

// api/users/:userId/friends/:friendId

router.route('/:userId/friends/:friendId').post().delete()

module.exports = router;