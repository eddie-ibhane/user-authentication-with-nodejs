import jwt from 'jsonwebtoken'
import User from '../Model/userModel.js'

const protect = async(req, res, next) => {
    let token
    token = req.cookies.jwt_token
    // console.log(token)
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password') //everything except password
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, invalid or expired token')
        }
    }else{
        res.status(401)
        throw new Error('Not authorized, No token')
    }
    
}

export {protect}