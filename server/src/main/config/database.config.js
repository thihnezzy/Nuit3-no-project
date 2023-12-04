const mongoose = require("mongoose")
const db = require('../model')
const MongoStore = require("connect-mongo")

const Role = db.role
const { MONGO_URI, DB_NAME } = process.env

let sessionMongo = new MongoStore({
    mongoUrl: MONGO_URI,
    dbName: DB_NAME,
    collection: 'session',
    crypto: {
        secret: 'nuitinfo'
    }
})

let connect = () => {
    mongoose.connect(MONGO_URI, { dbName: DB_NAME })
        .then(() => { console.log("Sucessfully connect to database") })
        .catch((err) => {
            console.log("Connect to database failed")
            console.log(err)
            process.exit(1)
        })
}

let initial = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if (count === 0) {
            await new Role({ name: "user" }).save();
            console.log("Added 'user' to roles collection");

            await new Role({ name: "admin" }).save();
            console.log("Added 'admin' to roles collection");
        }
    } catch (err) {
        console.error("Error initializing roles:", err);
    }
}


module.exports = {
    connect,
    initial,
    sessionMongo
}