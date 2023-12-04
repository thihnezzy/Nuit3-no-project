const mongoose = require("mongoose")
const { Schema } = mongoose
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    login: { type: String, require: true },
    password: {
        type: String,
        validate: {
            validator: function () {
                return this.login === 'local' ? !!this.password : true;
            },
            message: 'Password is required for local login.',
        },
    },
    role: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    profileId: { type: Schema.Types.ObjectId }
})

const User = mongoose.model("User", userSchema)

module.exports = User