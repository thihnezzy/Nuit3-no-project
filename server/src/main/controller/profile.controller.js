const profileService = require("../service").profileService


const createOne = async (req, res, next) => {
    try {
        const profileData = { ...req.body, userId: req.userId }
        const profile = await profileService.create(profileData)
        res.status(201).send({ profile: profile })
    } catch (err) {
        next(err)
    }
}

const getOne = async (req, res, next) => {
    try {
        let profile = await profileService.getFromProfileId(req.params.profileId)
        const { userId, ...profileWithoutUserId } = profile.toObject();
        profile = {
            ...profileWithoutUserId,
            email: userId.email,
        };
        // return profile
        res.status(201).send({ profile })
    } catch (err) {
        next(err)
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const profileId = req.params.profileId
        const profile = await profileService.getFromProfileId(profileId)
        console.log(profile.userId._id)
        console.log(req.userId)
        if (!profile.userId._id.equals(req.userId)) {
            return res.status(403).json({"error": "You are not owner of this profile"})
        }

        const result = await profileService.deleteById(profileId)
        res.status(200).send({ result: result })
    } catch (err) {
        next(err)
    }
}

const updateOne = async (req, res, next) => {
    try {
        const profileData = { ...req.body, profileId: req.params.profileId }
        const profile = await profileService.update(profileData)
        res.status(200).send({ profile: profile })
    } catch (err) {
        next(err)
    }
}

let profileController = {
    createOne,
    getOne,
    deleteOne,
    updateOne
}

module.exports = profileController