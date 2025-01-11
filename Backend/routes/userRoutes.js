import express from "express";
import User from '../models/userModels.js';
import { jwtAuthMiddleware, genrateJwtToken } from "../jwt/jsonWebToken.js";

const router = express.Router();

// POST route to add a user
router.post('/signup', async (req, res) => {
    try {
        const { name, age, email, mobile, address, addharCardNumber, password } = req.body;

        // Ensure all required fields are provided
        if (!name || !address || !addharCardNumber || !password) {
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }

        // Create a new User document using the Mongoose model
        const newUser = new User(req.body);

        // Save the new user to the database
        const response = await newUser.save();
        console.log('data saved');

        const payload = { id: response.id };
        console.log(JSON.stringify(payload));

        const token = genrateJwtToken(payload);  // Ensure this function is correctly defined somewhere in your backend
        console.log("Token is: ", token);

        // Send the response back with the user data and token
        res.status(200).json({ response: response, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {addharCardNumber, password} = req.body;

        // Find the user by username
        const user = await User.findOne({addharCardNumber: addharCardNumber});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
        }
        const token = genrateJwtToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        // console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await User.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// GET method to get the person


router.put('/profile/password', jwtAuthMiddleware, async (req, res)=>{
    try{
        const userId = req.user.id; // Extract the id from the token
const {currentPassword, newPassword} = req.body // extract current and new password from request body
       
// find the user by userId 
 const user = await User.findById(userId);

  // If password does not match, return error
  if( !user || !(await user.comparePassword(currentPassword))){
    return res.status(401).json({error: 'Invalid username or password'});
}

//update the users password 
user.password = newPassword;
await user.save();

        console.log('password updated');
        res.status(200).json({message: "Password updated"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})




 export default router;