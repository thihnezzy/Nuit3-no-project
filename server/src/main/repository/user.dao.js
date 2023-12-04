

const bcrypt = require("bcryptjs");

const db = require("../model/");
const User = db.user
const Role = db.role

let create = (email, password, method) => {
    const _password = (password) => {
        if (password) {
            return bcrypt.hashSync(password, 8);
        } else {
            return null;
        }
    };

    const newuser = new User({
        email: email,
        password: _password(password), // Call _password function with the password argument
        login: method,
        profileId: null
    });

    return newuser;
}
let save = async (user) => {
    return user.save()
}

let findByEmail = async (email) => {
    return User.findOne({ email: email })
}
let findByEmailWithRole = async (email) => {
    return User.findOne({ email: email }).populate("role", "-__v")
}

let findById = async (id) => {
    return User.findById(id);
}

let findUserRole = async (user) => {
    return Role.find({ _id: { $in: user.role } });
}

let findRole = async (role) => {
    return Role.findOne({ name: role })
}


let userDao = {
    create,
    save,
    findByEmail,
    findByEmailWithRole,
    findById,
    findUserRole,
    findRole
}

module.exports = userDao