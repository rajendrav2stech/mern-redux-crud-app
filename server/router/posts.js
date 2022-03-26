import express from 'express'
import { createPost, getPosts, getPost, updatePost, deletePost, likePost, getPostBySearch } from '../controllers/post.js'

import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/search', getPostBySearch)
router.get('/get-post', getPost)
router.get('/get-post/:id', getPosts)



router.post('/create-post/', auth, createPost)
router.put('/update-post/:id', auth, updatePost)
router.delete('/delete-post/:id', auth, deletePost)
router.patch('/like-post/:id', auth, likePost)


export default router