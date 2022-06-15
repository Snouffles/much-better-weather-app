const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const reload = require("reload");


require("dotenv").config();

const route = require("./routes/route.js");
const limiter = require("./middlewares/rateLimiter")

const PORT = process.env.PORT || 7890;

const app = express();


//MIDDLEWARE
app.use(limiter);
app.set("trust proxy", 1);

//ENABLE CORS
app.use(cors());

app.use(express.static("../public"));


//ROUTES
app.use("/api", route);

//LISTEN


// reload(app).then(()=>{
//     app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});
    
// });