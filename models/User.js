const { Schema, model } = require('mongoose')

    const userSchema = new Schema(
    {
        //Todo: Check if unique and trimmed are valid fields
        username: {
            type: String, 
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            //Todo: Validation for the entry to match an email's structure.
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)
//Retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;