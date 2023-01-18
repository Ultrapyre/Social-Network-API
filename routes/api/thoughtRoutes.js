const router = require('express').Router();

//functions pulled from the respective controller
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controller/thoughtController.js')

// api/thoughts/
router.route('/').get(getThoughts).post(createThought)

// api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction)

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;