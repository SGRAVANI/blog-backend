import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        minlength: [5, 'Blog title must be at least 5 characters long'],
        maxlength: [100, 'Blog title can be up to 100 characters long']
    },
    image: {
        type: String, // URL of the image
        required: [true, 'Image URL is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [50, 'Content must be at least 50 characters long']
    },
    subheading: {
        type: String,
        trim: true,
        maxlength: [100, 'Subheading can be up to 100 characters long']
    },
    labels: {
        type: [String], // Array of labels (tags or categories)
        default: [], // Optional
        validate: [arrayLimit, '{PATH} exceeds the limit of 10 labels']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User
        ref: 'User', // Refers to the UserModel
        required: [true, 'User is required']
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

function arrayLimit(val) {
    return val.length <= 10;
}

const BlogModel = mongoose.model('Blog', blogSchema);

export default BlogModel;
