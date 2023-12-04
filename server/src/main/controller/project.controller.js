const projectService = require("../service").projectService
const profileService = require("../service").profileService
const notificationService = require("../service").notificationService


const getAll = async (req, res, next) => {
    try {
        const projects = await projectService.getAll()
        return res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
}

const getOne = async (req, res, next) => {
    try {
        const projectID = req.params.id
        const project = await projectService.getOne(projectID)
        return res.status(200).json(project)
    } catch (err) {
        next(err)
    }
}

const createOne = async (req, res, next) => {
    try {
        const {name, description, image, hashtag, techStack, demo, desiredSize} = req.body;

        // Assuming you have a middleware or some method to get the profileId based on userId
        const profile = await profileService.getFromUserId(req.userId);
        const projectData = {
            state: 'idea',
            name,
            description,
            image,
            hashtag,
            techStack,
            demo,
            desiredSize,
            coordinator: {
                profileId: profile._id,
            }
        };

        const createdProject = await projectService.createOne(projectData, profile._id);

        res.status(201).json({project: createdProject});
    } catch (error) {
        next(error);
    }
};

const joinToProject = async (req, res, next) => {
    try {
        const projectId = req.params.projectId

        const project = await projectService.getOne(projectId)
        const profile = await profileService.getFromUserId(req.userId)

        for(let i = 0; i < project.queueList.length; i++) {
            let profile_ = project.queueList[i]
            if(profile_.profileId.equals(profile._id)) {
                return res.status(200).json("You have already asked to join to this project")
            }
        }

        project.queueList.push({profileId: profile._id})
        profile.projects.push({
            projectId: project._id,
            status: 'waiting'
        })

        // Send notification
        await notificationService.sendNotification(profile._id, project.coordinator.profileId,
            `Hey, ${profile.name} asked to join ${project.name}`)

        await project.save()
        await profile.save()

        return res.status(200).json(`Asked to join ${project.name} successfully !`)
    }catch(err) {
        next(err)
    }
}
const deleteOne = async (req, res, next) => {
    try {
        const profile = await profileService.getFromUserId(req.userId)
        await projectService.deleteOne(req.params.id, profile)
        return res.status(200).json("delete successfully")
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    getOne,
    createOne,
    deleteOne,
    joinToProject
};
