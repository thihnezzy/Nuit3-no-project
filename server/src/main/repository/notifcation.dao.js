const db = require("../model")
const profileDAO = require("./profile.dao")

const User = db.user
const Profile = db.profile
const Project = db.project
const Notification = db.notification

const createOne = async (srcProfileId, destProfileId, content) => {
    const newNotification = new Notification({
        src: srcProfileId,
        dest: destProfileId,
        content: content,
    });

    // Save the new notification
    const savedNotification = await newNotification.save();

    // Update sender's profile
    await Profile.findOneAndUpdate(
        { _id: srcProfileId },
        { $push: { notificationSend: { notificationId: savedNotification._id } } },
        { new: true }
    );

    // Update receivers' profiles
    await Profile.updateMany(
        { _id: destProfileId },
        { $push: { notificationReceived: { notificationId: savedNotification._id } } },
        {new: true}
    );

    return savedNotification;
}

const getOne = async (id) => {
    return Notification.findById(id)
}

const deleteOne = async (id) => {
    const deletedNotification = await Notification.findByIdAndRemove(id);

    if (!deletedNotification) {
        throw new Error('Notification not found.');
    }

    // Remove the reference from sender's profile
    await Profile.findOneAndUpdate(
        { _id: deletedNotification.src },
        { $pull: { notificationSend: { notificationId: deletedNotification._id } } }
    );

    // Remove the reference from receivers' profiles
    await Profile.updateMany(
        { _id: { $in: deletedNotification.dests.map(dest => dest.destId) } },
        { $pull: { notificationReceived: { notificationId: deletedNotification._id } } }
    );

    return deletedNotification;
}

const getSenderFromNotificationId = async (notificationId) => {

    // Find the notification by ID
    const notification = await Notification.findById(notificationId);

    if (!notification) {
        throw new Error('Notification not found.');
    }

    return Profile.findOne({_id: notification.src});
}

const getReceiversFromNotificationId = async (notificationId) => {

    const notification = await Notification.findById(notificationId);

    if (!notification) {
        throw new Error('Notification not found.');
    }

    // Find and return the receivers' profiles
    return Profile.find({_id: {$in: notification.dests.map(dest => dest.destId)}});

};

let notificationDAO = {
    createOne,
    getOne,
    deleteOne,
    getSenderFromNotificationId,
    getReceiversFromNotificationId,
}

module.exports = notificationDAO