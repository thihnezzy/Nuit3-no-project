const db = require("../model")
const User = db.user
const Project = db.project

const RessourceNotFoundError = require("../errors/RessourceNotFoundError")


let getAll = async () => {
    return Project.find();
}

let getOne = async (id) => {
    const project = await Project.findById(id)
    if (!project) {
        throw new RessourceNotFoundError(`Project ${id} not found`)
    }
    return project
}

let createOne = async (projectData) => {
    const project = new Project({
        state: projectData.state,
        name: projectData.name,
        description: projectData.description,
        image: projectData.image,
        hashtag: projectData.hashtag,
        techStack: projectData.techStack,
        demo: projectData.demo || '',
        coordinator: {
            profileId: projectData.coordinator.profileId,
        },
        desiredSize: projectData.desiredSize,
        queueList: [],
        members: []
    });

    return await project.save();
}

let deleteAll = async () => {
    return Project.deleteMany();
}

let deleteOne = async (id) => {
    const result = await Project.findByIdAndDelete(id);
    if (!result) {
        throw new RessourceNotFoundError(`Project with ID ${id} not found`);
    }
    return result;
}

let putOne = async (id, updateData) => {
    const result = await Project.findByIdAndUpdate(id, updateData, {new: true});
    if (!result) {
        throw new RessourceNotFoundError(`Project with ID ${id} not found`);
    }
    return result;
}

let removeProfileFromProjects = async (profile) => {

    // Remove the profile from the coordinator field in projects
    await Project.deleteMany({'coordinator.profileId': profile._id});

    // Remove the profile from the queueList field in projects
    await Project.updateMany(
        {'queueList.profileId': profile._id},
        {$pull: {queueList: {profileId: profile._id}}}
    );

    // Remove the profile from the members field in projects
    await Project.updateMany(
        {'members.profileId': profile._id},
        {$pull: {members: {profileId: profile._id}}}
    );
};

let projectDAO = {
    getAll,
    getOne,
    createOne,
    deleteAll,
    deleteOne,
    putOne,
    removeProfileFromProjects
}


module.exports = projectDAO
