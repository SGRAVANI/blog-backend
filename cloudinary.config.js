import { v2 as cloudinary }  from "cloudinary";
//import cloudinary from "cloudinary"
import fs from "fs"
import dontenv from "dotenv";
import express from "express";
//const app=express() 
dontenv.config() 

cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudnary=async (localFilePath) =>
{
    try{
        //console.log(localFilePath)
        if(!localFilePath)
            {
                return null
            }
            //uplod the file on cloudinary
        let response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("file uploaded succesfully at",response.url)
        fs.unlinkSync(localFilePath)
        return response
        

}
 catch(error)
 {
    console.log(error)
fs.unlinkSync(localFilePath)
//remove locally stored temp file as upload operation is failed
return null 
}

}
export {uploadOnCloudnary}
