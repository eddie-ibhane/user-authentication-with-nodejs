import User from '../Model/userModel.js'
import generateToken from '../Utilities/generateToken.js'
import bcrypt from 'bcrypt'

// @desc Register
// route Post api/users/register
// @access public
const register = async(req, res) => {
    try {
        const {name, email, password} = req.body
        const userExist = await User.findOne({email: email})
        if(userExist){
            res.status(400).json({status: false, message: "User already exist"})
        }else{
            const createUser = new User ({
                name, email, 
                password: bcrypt.hashSync(password, 10)
            })
            const saveUser = await createUser.save()
            if(saveUser){
                res.json({status: true, message: "Registration successful", name: saveUser.name, email: saveUser.email})
            }
        }
    } catch (error) {
        throw new Error(error)  
    }
}

// @desc Login
// route Post api/users/login
// @access public
const login = async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        // console.log(user)
        if(user){
            const passwordMatch = bcrypt.compareSync(password, user.password)
            if (passwordMatch) {
                generateToken(res, user._id)
                res.json({status: true, message: "User logged in", user})
            } else {
                res.status(400).json({status: false, message: "Invalid email or password"})
            }
        }else{
            res.status(400).json({status: false, message: "Record not found!"})
        }
    } catch (error) {
        throw new Error(error)
    }
}

// @desc Logout
// route Post api/users/logout
// @access private
const logout = async(req, res) => {
    try {
        res.cookie('jwt_token', '', {
            httpOnly: true,
            status: false,
            sameSite: 'strict',
            maxAge: new Date(0)
        })
        res.json({status: true, message: "User logged out"})
    } catch (error) {
        throw new Error(error)
    }
}

// @desc Get user details
// route Post api/user-profile
// @access private
const fetchUsers = async(req, res) => {
    try {
        const user = await User.findById(req.user._id)
        // const user = await User.findOne({_id: req.user._id})
        if (user) {
            res.json({status: true, message: "user retrieved", user})
        } else {
            res.status(400).json({status: false, messgae: "Record note found"})
        }
    } catch (error) {
        throw new Error(error)
    }
}

// @desc Change your password
// route Put api/users/change-password
// @access private
const updatePassword = async(req, res) => {
    try {
        const {oldPassword, newPassword} = req.body
        // const user = await User.findOne({email: email}) 
        const user = await User.findById({_id: req.user._id}) 
        // console.log(user) 
        if (user) {
            // check if the old password matches with the stored hashed password 
            const passwordMatch = bcrypt.compareSync(oldPassword, user.password)
            if (passwordMatch){
                //Hash the new password and update the user's password in the database
                const hashedNewPassword = bcrypt.hashSync(newPassword, 10)
                user.password = hashedNewPassword
                await user.save()
                res.json({status:true, message: "Password updated successfully"})
            }else{
                res.status(400).json({status: false, message: "Invalid old password"})
            }
        } else {
            res.status(400).json({status: false, message: "Record not found"})
        }
    } catch (error) {
        // throw new Error(error) 
        res.status(500).json({status: false, message: "Error updating password"})
    } 
}

// @desc Change your profile
// route Post api/users/update-profile
// @access private
const updateProfile = async(req, res) => {
    try {
        const { name, email } = req.body
        // Assuming user ID is available in the request object, such as from authentication middleware
        const userId = req.user._id; 
        const userExist = await User.findById(userId)
        if(userExist){
            userExist.name = name ? name : userExist.name
            userExist.email = email ? email : userExist.email
            await userExist.save()
            res.json({status: true, message: "Profile updated successfully", userExist})
        }else{
            res.status(400).json({status: false, message: "Profile not found"})
        }
    } catch (error) { 
        throw new Error(error)
        // res.status(500).json({status: false, message: "Error updating profile"})
    }
}

// @desc Delete profile
// route Post api/users/delete-profile
// @access private
const deleteProfile = async(req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        // console.log(user) 
        if (user) {
            // await user.remove() 
            await User.deleteOne({_id: userId})
            res.json({status: true, message: "Profile deleted successfully!", user})
        } else {
            res.status(400).json({status: false, message: "No record found!"})
        }
    } catch (error) {  
        throw new Error(error) 
        // res.status(500).json({status: false, message: "Error deleting profile"}) 
    }
} 

export {register, login, logout, fetchUsers, updatePassword, updateProfile, deleteProfile}