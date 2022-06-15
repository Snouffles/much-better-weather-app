const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
    windowMS: 10 * 60 * 6000,//10minutes
    max: 20
})

module.exports = limiter; 