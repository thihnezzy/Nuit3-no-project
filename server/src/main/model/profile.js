const mongoose = require("mongoose")
const { Schema } = mongoose

const profileSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    image: { type: String, required: true },
    name: { type: String, require: true },
    github: { type: String, require: true },
    techSkills: { type: [String], require: true },

    projects: [
        {
            projectId: { type: mongoose.Schema.ObjectId, ref: 'Project', required: true },
            status: {type: String, enum: ['waiting', 'coordinator', 'member']}
        }
    ],

    notificationSend: [{
        notificationId: { type: Schema.Types.ObjectId, ref: 'Notification', require: true }
    }],
    notificationReceived: [{
        notificationId: { type: Schema.Types.ObjectId, ref: 'Notification', require: true }
    }]
})

const Profile = mongoose.model("Profile", profileSchema)

module.exports = Profile