const jwt = require("jsonwebtoken");
const redis = require("../db/redis");

const authUser = async (req, res, next)=>{
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        };

        const isBlacklistToken = await redis.get(`blacklist:${token}`);

        if(isBlacklistToken){
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decoded =await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded

        next();

    } catch (err) {
       return res.status(500).json({
                message : err.message
        });
    }
};

module.exports =  authUser;