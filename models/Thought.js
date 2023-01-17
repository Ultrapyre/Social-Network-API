const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction.js')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            Type: String,
            required: true,
            min_length: 1,
            max_length: 280
        },
        createdAt: {
            Type: Date,
            default: Date.now(),
        },
        username: {
            Type: String,
            required: true
        },
        reactions: [reactionSchema] 
    },
    {
        //Todo: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
    }
)