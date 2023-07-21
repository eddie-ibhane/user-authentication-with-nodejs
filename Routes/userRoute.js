import express from 'express'
// import router from './postRoute'
import { deleteProfile, fetchUsers, login, logout, register, updatePassword, updateProfile } from '../Controllers/userController.js'
import { protect } from '../Middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', protect, logout)
router.get('/user-profile', protect, fetchUsers)
router.put('/change-password', protect, updatePassword)
router.put('/update-profile', protect, updateProfile)
router.delete('/delete-profile', protect, deleteProfile)

export default router