import express from "express"
import { fetch ,createUser, login} from "../controller/user.controller.js"
import { createBlog, getBlogs } from "../controller/blog.controller.js";
const route=express.Router();
route.get("/fetch",fetch)
route.post("/login",login)
route.post("/register",createUser)
route.post("/addblog",createBlog)
route.post("/getblogs",getBlogs)
export default route;