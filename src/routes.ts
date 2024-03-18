import { Application } from "express";
import authRouter from "./modules/auth";
import listProductRouter from "./modules/listProduct";
import userRouter from "./modules/user";
export default (app: Application) => {
  let routes = [
    authRouter,
    userRouter,
    listProductRouter,
  ]

  routes.forEach((functionName): void => {
    functionName(app)
  })
}