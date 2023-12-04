let corsOptions = {
    origin: function(origin, callback) {
        let allowed_origin = ["http://localhost:3000", "http://localhost:5173", "https://nuit3-thihnezzy.vercel.app"]
        if(allowed_origin.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }else {
            callback(new Error("Not Allowed by CORS"))
        }
    }
}

module.exports = {
    corsOptions
}