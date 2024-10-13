import mongoose from 'mongoose';
// const locationSchema=new mongoose.Schema({
//     country:{
//         type:String,
//     },
//     city:{
//         type:String,
//     },
//     state:{
//         type:String,
//     }
// },
//     {
//         timestamps:true,
//     }
// )
//const LocationModel=mongoose.model('Location',locationSchema)

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        minlength: [5, 'Blog title must be at least 5 characters long'],
       
    },
    image: {
        type: String, // URL of the image
       
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        //minlength: [50, 'Content must be at least 50 characters long']
    },
    subheading: {
        type: String,
        trim: true,
      
    },
    labels: {
        type: [String], // Array of labels (tags or categories)
        default: [], // Optional
        validate: [arrayLimit, '{PATH} exceeds the limit of 10 labels']
    },
    location:{
  //    type:mongoose.Schema.Types.ObjectId,
   //   ref:'Location',
     type:Object,

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
