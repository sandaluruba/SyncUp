import User from '../models/user.model.js';
import Message from '../models/message.model.js';

export const getUsersForSideBar = async (req, res) => {
    try{

        const loggedUserId = req.user._id;
        const filterUsers = await User.find({_id: {$ne: loggedUserId}}).select("-password");

        res.status(200).json(filterUsers);

    } catch(error){
        console.error("Error fetching users for sidebar:", error);

    }
}

export const getMessages = async (req, res) => {
    try{

        const {id:ReceiverId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: ReceiverId},
                {senderId: ReceiverId, receiverId: myId}
            ]
        })

        res.status(200).json(messages);

    } catch(error){
        console.error("Error fetching messages:", error);
    }
}

export const sendMessages = async (req, res) => {
    try{
        const {message, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            image: imageUrl
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch(error){
        console.error("Error sending message:", error);
    }
}