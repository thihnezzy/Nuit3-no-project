const { model } = require("mongoose")
const cloudinaryService = require("../service").cloudinaryService


const uploadImage = async (req, res, next) => {
    try {
        console.log("cloudinary controoler" + req.body.imageUrl)
        const imageUrl = req.body.imageUrl

        const { public_id, cloudinaryImgUrl } = await cloudinaryService.uploadImage(imageUrl)
        res.status(201).send({ message: "upload image success", public_id: public_id, imageUrl: cloudinaryImgUrl })
    } catch (err) {
        next(err)
    }
}

let cloudinaryController = {
    uploadImage,
}

module.exports = cloudinaryController
