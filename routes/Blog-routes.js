import express from "express";
import { addBlog, deleteBlog, getByUserId, updateBlog } from "../controllers/blog-controller.js";
import { getAllBlogs } from "../controllers/blog-controller.js";
const blogRouter = express.Router();
import { getById } from "../controllers/blog-controller.js";
blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get('/user/:id',getByUserId)
export default blogRouter;