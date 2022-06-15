const url  = require("url");
const needle = require("needle");
require("dotenv").config();

//env vars
const API_KEY = process.env.API_WEATHER_KEY;
const API_NAME = process.env.API_WEATHER_NAME;
const API_URL = process.env.API_WEATHER_BASE_URL;






exports.callAPI= async (req, res, next ) => {
    
    try{
        console.log(url.parse(req.url, true).query);
        const params = new URLSearchParams({
            [API_NAME]: API_KEY,
            ...url.parse(req.url, true).query,
        })
        console.log(API_NAME)
        const apiRes = await needle("get", `${API_URL}?${params}`);
        const data = apiRes.body;

        //log the request to the public API
        if(process.env.NODE_ENV !== "production"){
            console.group(`REQUEST: ${API_URL}?${params}`);
        }
    
        res.status(200).json(data)
    } catch (error){
        res.status(500).json({error : error.message})
    }
} 