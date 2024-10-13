import BlogModel from "../model/blogs.model.js"; //
import UserModel from "../model/user.model.js"; // 
import { uploadOnCloudnary } from "../cloudinary.config.js";
// Create a new blog
const createBlog = async (req, res) => {
    try {
        //console.log(req.body)
        console.log("create blog called")
        const { title, image, content, subheading, labels,userId,location } = req.body;

        const imagePath=req.files?.image[0]?.path;
        //  const coverImageLocalPath=req.files?.coverImage[0]?.path
        // let coverImageLocalPath;
        // if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0)
        //     {
        //      coverImageLocalPath=req.files.coverImage.path;
        //     }
        const imageUrl=await uploadOnCloudnary(imagePath)
        console.log(imageUrl)
        // const coverImage= coverImageLocalPath && await uploadOnCloudnary(coverImageLocalPath)
        if(!imageUrl)
            {
                throw new ApiError(400,"Avatar file is required !!!")
            }

        let locationOb=JSON.parse(location)
        console.log(content,locationOb)
        let labelsArray=labels.split(',')

       //console.log("create blog called",labels)
        // Validate required fields
        //console.log( title, image, content, subheading, labels )
        if (!title || !content || !subheading) {
            return res.status(400).json({ message: "Title, content, and subheading are required" });
        }

        // Get the user who is creating the blog (assuming you are passing user ID in the request)
        //const userId = req.userId; // Extract user ID from the request (e.g., from middleware)
        //console.log(userId,"from req")
        const user = await UserModel.findById(userId).select("-password");
       console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
       //console.log(user)
        // Create the blog
        const newBlog = await BlogModel.create({
            title,
            //image:imageUrl,
            image:imageUrl.url,
            content,
            subheading,
            labels:labelsArray,
            user: userId,
            location:{...locationOb} 
        });

        //await newBlog.save();

        // Return success response
        return res.status(201).json({ message: "Blog created successfully", data: newBlog });
    } catch (e) {
        console.error("Error creating blog:", e); // Log error for debugging
       return res.status(500).json({ message: "An error occurred while creating the blog" });
    }
};

const getBlogsByCountry = async (req, res) => {
    const { country } = req.query; // Get country from query parameters

    try {
        
        const blogs = await BlogModel.find({ 'location.country': country })
            .sort({ createdAt: -1 }); // Sort by createdAt in descending order

        // Check if any blogs exist
        if (!blogs.length) {
            return res.status(404).json({ message: "No blogs found for this location." });
        }

        // Return the list of blogs
        return res.status(200).json({ message: "Blogs retrieved successfully", data: blogs });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: "An error occurred while retrieving blogs." });
    }
};






const getBlogs = async (req, res) => {
    try {
        // Fetch all blogs from the database

        
        console.log("inside getBlogs")
        const blogs = await BlogModel.find();
       console.log(blogs)
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

const getUserSpecificBlogs = async (req, res) => {
    try {
        // Fetch all blogs from the database
       // console.log("inside getBlogs")
      
        const blogs = await BlogModel.find({user:req.query.userId});
      // console.log(blogs)
        // Check if any blogs exist
        if (!blogs.length) {
            return res.status(404).json({ message: "No blogs found." });
        }

        // Return the list of blogs
        return res.status(200).json({ message: "Blogs retrieved successfully", data: blogs });
    } catch (error) {
       // console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "An error occurred while retrieving blogs." });
    }
};

const deleteBlog = async (req, res) => {
    const blogId = req.params.id; 
   console.log("inside Delete blog",blogId)
    try {
      
        const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

        
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // If deletion is successful, return a success response
        return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        // Handle errors (e.g., invalid ID format)
        console.error(error);
        return res.status(500).json({ message: "Error deleting the blog" });
    }
};

const updateBlog = async (req, res) => {
    const blogId = req.params.id; 
    
    const { title, image, content, subheading, labels } = req.body;
     //   console.log(content,location)
     console.log(labels)
        let labelsArray=labels.split(',')

   console.log("inside update blog",blogId)
    try {
      
        const updatedBlog = await BlogModel.findByIdAndUpdate(
            blogId,
            {
                title,
                image,
                content,
                subheading,
                labels:labelsArray
            },
            { new: true } 
        )

        
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // If deletion is successful, return a success response
        return res.status(200).json({ message: "Blog updated successfully",data:updateBlog });
    } catch (error) {
        // Handle errors (e.g., invalid ID format)
        console.error(error);
        return res.status(500).json({ message: "Error updating the blog" });
    }
};

async function getBlogById(req,res)
{
    console.log("reached to get data of blog by id")
    const blogId = req.params.id; 
    console.log(blogId)
    console.log("inside get blog by id",blogId)
     try {
       
         const getBlog = await BlogModel.findById(blogId);
 
         
         if (!getBlog) {
             return res.status(404).json({ message: "Blog not found" });
         }
 
         // If deletion is successful, return a success response
         return res.status(200).json({ message: "Blog fetched successfully",data:getBlog });
     } catch (error) {
         // Handle errors (e.g., invalid ID format)
         console.error(error);
         return res.status(500).json({ message: "Error in fetching the blog" });
     }
}

export { createBlog,getBlogs,getUserSpecificBlogs ,deleteBlog,getBlogById,updateBlog,getBlogsByCountry};
