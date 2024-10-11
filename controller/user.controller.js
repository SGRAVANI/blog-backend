
import UserModel from "../model/user.model.js"

const createUser=async (req,res)=>{
    try{
        const {name,email,username,password,location}=req.body;
         let isUserExist=await UserModel.findOne({email})
         if(isUserExist)
         {
            return res.status(409).json({message:"user with this email already exists"})
         }
         if([name,email,password,username,location].find((ele)=>ele.trim()==''))
         {
            return res.status(400).json({message:"All fields are required"})
         }
    // const userData=new UserModel(req.body)
            const user=await UserModel.create({
                name,
                username,
                email,
                location,
                password
            })
            
            const createdUser=await UserModel.findById({_id:user._id}).select()
            
            if(createdUser)
            {
                return res.status(201).json({message:"user created",data:user})
            }
            else{
                return res.status(500).json({message:"something went wrong while generationg user",data:createUser})
            }

    }
    catch(e){
    res.status(400).json({message:"error occured from server side"})
    }
}
const login=async(req,res)=>{
    try{
        console.log("login called")
      let {username,password,email}=req.body;
      console.log(email,password)
      if(!username && !email)
      {
        return res.status(400).json({message:"username/email is required"})
      }
      if(!password)
      {
      return  res.status(400).json({message:"password is required"})
      }

      if(username)
      {
        let userData=await UserModel.findOne({username})
        console.log(userData)
        if(!userData)
        {
            return res.status(404).json({message:"Invalid username"})
        }
        if(userData)
        {
       
            let iscorrectPwd=await userData.isPasswordCorrect(password)
          //  console.log(iscorrectPwd,"reached here")
            if(iscorrectPwd)
            {
               return res.status(200).json({message:"login successful",userId:userData._id})
            }
            else{
                return res.status(404).json({message:"Password Mismatch"})
            }
        }
    }
        else if(email)
        {
            let userData=await UserModel.findOne({email})
            if(!userData)
            {
                return res.status(404).json({message:"email does not exist"})
            }
            let iscorrectPwd=await userData.isPasswordCorrect(password)
           console.log(iscorrectPwd)
            if( iscorrectPwd)
                {
                    
                   return res.status(200).json({message:"login successful",user:userData})
                }
                else{
                    return res.status(404).json({message:"Password Mismatch"})
                }
        

      }

    }
    catch(e)
    {
        res.status(500).json({message:"error occured from server side"})
    }
}
 const fetch=async (req,res)=>{
    try{
        res.json("hello world")
    }
    catch(e)
    {
        res.status(500).json({error:"internal server error"})
    }
}
export {createUser,fetch,login};