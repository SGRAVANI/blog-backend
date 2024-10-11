import BlogModel from "../model/blogs.model.js"; //
import UserModel from "../model/user.model.js"; // 

// Create a new blog
const createBlog = async (req, res) => {
    try {
        const { title, image, content, subheading, labels } = req.body;

        // Validate required fields
        if (!title || !content || !subheading) {
            return res.status(400).json({ message: "Title, content, and subheading are required" });
        }

        // Get the user who is creating the blog (assuming you are passing user ID in the request)
        const userId = req.userId; // Extract user ID from the request (e.g., from middleware)
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create the blog
        const newBlog = new BlogModel({
            title,
            image,
            content,
            subheading,
            labels,
            author: userId 
        });

        await newBlog.save();

        // Return success response
        return res.status(201).json({ message: "Blog created successfully", data: newBlog });
    } catch (e) {
        console.error("Error creating blog:", e); // Log error for debugging
        res.status(500).json({ message: "An error occurred while creating the blog" });
    }
};

const getBlogs = async (req, res) => {
    try {
        // Fetch all blogs from the database
        const blogs = await BlogModel.find();

        // Check if any blogs exist
        if (!blogs.length) {
            return res.status(404).json({ message: "No blogs found." });
        }

        // Return the list of blogs
        return res.status(200).json({ message: "Blogs retrieved successfully", data: blogs });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "An error occurred while retrieving blogs." });
    }
};
export { createBlog,getBlogs };
