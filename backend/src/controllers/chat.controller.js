const chatModel = require("../models/chat.model");


const createChat = async (req, res)=>{
    try {
        const {title} = req.body;
        const chat = await chatModel.create({
            title,
            user:user.id,
        });

        res.status(201).json({
            message: "Chat Created Successfullly.",
            chat
        })
    } catch (error) {
        
    }
};


module.exports = {createChat};