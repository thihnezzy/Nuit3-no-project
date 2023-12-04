const RessourceNotFoundError = require("../errors/RessourceNotFoundError")
const cloudinaryService = require("./cloudinary.service")



const profileDao = require("../repository").profileDAO
const projectDao = require("../repository").projectDAO
const userDao = require("../repository").userDAO

const { DEFAULT_PROFILE_IMAGE } = process.env
const create = async (data) => {
    const user = await userDao.findById(data.userId)
    if (user.profileId) {
        return { error: "already have profile" }
    }
    if (!data.name || !data.github || !data.techSkills || !data.userId) {
        throw new RessourceNotFoundError("req.body missing some input attribute for profile create operation");
    }
    if (!data.image) {
        data.image = DEFAULT_PROFILE_IMAGE
    }
    const { public_id, url: cloudinaryImgUrl } = await cloudinaryService.uploadImage(data.image)
    data = { ...data, image: cloudinaryImgUrl }
    return await profileDao.create(data.image, data.name, data.github, data.techSkills, data.userId)
}

const getFromUserId = async (userId) => {
    if (!userId) {
        throw new RessourceNotFoundError("userId missing")
    }
    const user = await userDao.findById(userId)
    return await profileDao.findById(user.profileId)
}
const getFromProfileId = async (profileId) => {
    if (!profileId) {
        throw new RessourceNotFoundError("profileId missing")
    }
    return await profileDao.findById(profileId)
}
const deleteById = async (profileId) => {
    // the profile that need to be deleted
    const profile = await profileDao.findById(profileId)

    if (profile.image) {
        const public_id = cloudinaryService.getPublicIdFromUrl(profile.image)
        await cloudinaryService.deleteImage(public_id)
    }

    // delete the projects related to the profile
    await projectDao.removeProfileFromProjects(profile)

    // Delete the profile
    return await profileDao.deleteById(profileId)
}
const update = async (data) => {
    if (!data.profileId || !data.profileUpdate) {
        throw new RessourceNotFoundError("req.body.profileId missing for updateProfile")
    }
    if (data.profileUpdate.image) {
        const { public_id, url: cloudinaryImgUrl } = await cloudinaryService.uploadImage(data.profileUpdate.image)
        data.profileUpdate.image = cloudinaryImgUrl
        const oldProfile = await profileDao.findById(data.profileId)
        const oldImageId = cloudinaryService.getPublicIdFromUrl(oldProfile.image)
        await cloudinaryService.deleteImage(oldImageId)
    }

    return await profileDao.updateById(data.profileId, data.profileUpdate)
}

const deleteAll = async () => {
    const allProfiles = await profileDao.getAll();

    // Extract image URLs from profiles and projects
    const profileImageUrls = allProfiles.map(profile => profile.image);

    // Delete all images from Cloudinary
    for (const imageUrl of profileImageUrls) {
        const publicId = cloudinaryService.getPublicIdFromUrl(imageUrl);
        await cloudinaryService.deleteImage(publicId);
    }
    await profileDao.deleteAll()

    await projectDao.deleteAll()
    console.log("all profile deleted");
}
const profileService = {
    create,
    getFromUserId,
    deleteById,
    update,
    deleteAll,
    getFromProfileId
}
module.exports = profileService
