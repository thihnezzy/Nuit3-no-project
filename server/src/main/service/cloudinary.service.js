const cloudinary = require("../config").cloudinaryConfig

const uploadImage = async (imagePath) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    const result = await cloudinary.uploader.upload(imagePath, options);
    return { public_id: result.public_id, url: result.url };

}
const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
        colors: true,
    };
    // Get details about the asset
    const result = await cloudinary.api.resource(publicId, options);
    return result.colors;

};
const createImageTag = (publicId, ...colors) => {

    // Set the effect color and background color
    const [effectColor, backgroundColor] = colors;

    // Create an image tag with transformations applied to the src URL
    let imageTag = cloudinary.image(publicId, {
        transformation: [
            { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
            { radius: 'max' },
            { effect: 'outline:10', color: effectColor },
            { background: backgroundColor },
        ],
    });

    return imageTag;
};

const deleteImage = async (publicId) => {
    const result = await cloudinary.uploader.destroy(publicId);
    // 'result' will contain information about the deletion (check Cloudinary API docs for details)
    console.log(`Deleted image with public ID: ${publicId}`);
    return result;
}

function getPublicIdFromUrl(cloudinaryUrl) {

    const parts = cloudinaryUrl.split('/');
    const filename = parts[parts.length - 1];
    const publicId = filename.split('.')[0]; // Remove file extension
    return publicId;
}

let cloudinaryService = {
    uploadImage,
    getAssetInfo,
    createImageTag,
    deleteImage,
    getPublicIdFromUrl
}

module.exports = cloudinaryService