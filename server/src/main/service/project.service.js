const UnauthorizedError = require("../errors/UnauthorizedError");
const projectDAO = require("../repository").projectDAO
const profileDAO = require("../repository").profileDAO


let getAll = async () => {
    try {
        return await projectDAO.getAll()
    } catch (err) {
        throw err
    }
}

let getOne = async (id) => {
    return await projectDAO.getOne(id)
}

let createOne = async (projectData, profileId) => {
    // Create the project
    const createdProject = await projectDAO.createOne(projectData);

    await profileDAO.addProject(profileId, createdProject._id);

    return createdProject;
};

let deleteOne = async (projectId, profile) => {
    const deletedProject = await projectDAO.getOne(projectId);

    if (!deletedProject.coordinator.profileId.equals(profile._id)) {
        throw new UnauthorizedError("you are not coordinator of project")
    }
    await profileDAO.removeProject(deletedProject)
    // Finally, delete the project
    return await projectDAO.deleteOne(projectId);
}

let putOne = async (id, updateData) => {
    try {
        return await projectDAO.putOne(id, updateData)
    } catch (err) {
        throw err
    }
}


let projectService = {
    getAll,
    getOne,
    createOne,
    deleteOne,
    putOne
}

module.exports = projectService