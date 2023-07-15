import { Router } from "express";
import userController from "../controllers/UserController";

const userRouter = Router();

userRouter.get('/', userController.index)
userRouter.post('/user', userController.create)
userRouter.post('/login', userController.login)
userRouter.get('/profile', userController.getProfile)

export default userRouter;