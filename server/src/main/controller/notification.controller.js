const notificationService = require('../service').notificationService
const profileService = require("../service").profileService



let getAllNotificationsReceived = async (req, res, next) => {
    try {
        const profile = await profileService.getFromUserId(req.userId)
        const notification = await notificationService.getAllNotificationsReceived(profile._id)
        res.status(200).send({ notification: notification })
    } catch (err) {
        next(err)
    }
}

let notificationController = {
    getAllNotificationsReceived
}

module.exports = notificationController