import { User } from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";

const sigunp =asyncHandler( async (req,res)=>{
    const {name,username,email,password} = req.body

    if(![name,username,email,password].some((value)=> value.trim() !== "")){
                      
    }
})