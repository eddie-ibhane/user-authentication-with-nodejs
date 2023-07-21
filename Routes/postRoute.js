import express from 'express'
import { createPost, fetchPosts } from '../Controllers/postController.js'

const router = express.Router()

router.post('/', createPost)
router.get('/', fetchPosts)

export default router