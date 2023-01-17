const { Schema, model } = require('mongoose')

    const userSchema = new Schema(
    {
        username: {
            //Todo: Check if unique and trimmed are valid fields
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
        //Todo: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
    }
)

const User = model('user', userSchema);

module.exports = User;