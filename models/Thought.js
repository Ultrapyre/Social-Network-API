const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction.js')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema] 
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

//Retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought;