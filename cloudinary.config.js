 import { v2 as cloudinary }  from "cloudinary";
// //import cloudinary from "cloudinary"
// import fs from "fs"
// import dontenv from "dotenv";
// import express from "express";
// //const app=express() 
// dontenv.config() 

cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

// const uploadOnCloudnary=async (localFilePath) =>
// {
//     try{
//         //console.log(localFilePath)
//         if(!localFilePath)
//             {
//                 return null
//             }
//             //uplod the file on cloudinary
//         let response=await cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto"
//         },{ folder: 'uploads' })
//         console.log("file uploaded succesfully at",response.url)
//       //  fs.unlinkSync(localFilePath)
//         return response
        

// }
//  catch(error)
//  {
//     console.log(error)
// //fs.unlinkSync(localFilePath)
// //remove locally stored temp file as upload operation is failed
// return null 
// }

// }
// export {uploadOnCloudnary}
// export const uploadToCloudinary = async (filePath) => {
//     return new Promise((resolve, reject) => {
//       cloudinary.v2.uploader.upload(filePath, { folder: 'uploads' }, (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result.url);  // The Cloudinary URL
//         }
//       });
//     });
//   };

export const uploadToCloudinary = async (filePath) => {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(filePath, { folder: 'uploads' }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.url);  // The Cloudinary URL
        }
      });
    });
  };
  