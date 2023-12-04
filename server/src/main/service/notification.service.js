const projectDAO = require("../repository").projectDAO
const profileDAO = require("../repository").profileDAO
const notificationDAO = require("../repository").notificationDAO
const Notification = require("../model").notification

let sendNotification = async (srcProfileId, destProfileId, content) => {
    return await notificationDAO.createOne(srcProfileId, destProfileId, content)
}

let getAllNotificationsReceived = async (profileId) => {
    let profile = await profileDAO.findById(profileId)

    return await Promise.all(
        profile.notificationReceived.map((notification) => notificationDAO.getOne(notification.notificationId))
    )
}

module.exports = {
    sendNotification,
    getAllNotificationsReceived
}