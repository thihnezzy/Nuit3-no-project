const mongoose = require("mongoose")


const notificationSchema = new mongoose.Schema({
    src: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },

    dest: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },

    content: { type: String, required: true }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;