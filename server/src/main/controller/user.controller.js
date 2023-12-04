// const userService = require("../service/user.service")
const errorHandler = require("../errors/errorHandler")
const userDao = require("../repository").userDAO



let userBoard = async (req, res, next) => {
    try {
        let user = await userDao.findById(req.userId);
        res.status(200).send({
            "id": user.id,
            "email": user.email,
            "role": "user"
        });

    } catch (err) {
        errorHandler(err, res)
    }
};

let adminBoard = async (req, res) => {
    try {
        let user = await userDao.findById(req.userId);
        res.status(200).send({
            "id": user.id,
            "email": user.email,
            "role": "admin"
        });

    } catch (err) {
        errorHandler(err, res)
    }
};

const userController = {
    userBoard,
    adminBoard
}


module.exports = userController