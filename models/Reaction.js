const { Schema, Types } = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280
        },
        username: {
            Type: String,
            required: true
        },
        createdAt: {
            Type: Date,
            default: Date.now(),
        }
    },
    {
        //Use a getter method to format the timestamp on query
    }
)

module.exports = reactionSchema