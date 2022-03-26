import express from "express"

const router = express.Router()
import { signin, signup, userList } from "../controllers/user.js"

// router.get('/api', userList)
router.post('/sign-in', signin)
router.post('/sign-up', signup)


export default router