import express from "express"
import { fetch ,createUser, login} from "../controller/user.controller.js"
import { createBlog, getBlogs,getUserSpecificBlogs,deleteBlog,getBlogById ,updateBlog,getBlogsByCountry} from "../controller/blog.controller.js";
//import { upload } from "../middleware/multer.middleware.js";
const route=express.Router();
// import multer from "multer";
// const storage = multer.memoryStorage(); // No local storage
// const upload = multer({ storage: storage });
route.get("/fetch",fetch)
route.post("/login",login)
route.post("/register",createUser)
route.post("/addblog",createBlog)
//route.post("/addblog",createBlog)
route.get("/getblogs",getBlogs)
route.get("/getblogsbycountry",getBlogsByCountry)
route.get("/getuserblogs",getUserSpecificBlogs)
route.delete("/deleteblog/:id",deleteBlog)
route.get("/getblogbyid/:id",getBlogById)
route.patch("/updateblog/:id",updateBlog)


export default route;