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
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            //Modifies the date format into a more readable format when queried.
            get: (function(value){return value.toLocaleString()})
        },
        reactions: [reactionSchema] 
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
)

//Retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought;