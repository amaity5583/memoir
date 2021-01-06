import PostMessages from '../models/postMessage.js'
import mongoose from 'mongoose';
export const getPosts = async (req, res) => {
  try {
    const postMsg =await PostMessages.find();

    res.status(200).json(postMsg);
  } catch (error) {
    res.status(404).json({ message: error });
  }
  res.send('THIS WORKS!');
};

export const createPosts=async (req,res)=>{
  const post =req.body;
  
  const newPost = new PostMessages(post);
  try {
    await newPost.save();    

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({message:error.message});
  }
};


export const updatePosts =async(req,res)=>{
  const post =req.body;
  const { id : _id}= req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Nothing with that id');
    const updatedPost =await PostMessages.findByIdAndUpdate(_id,{...post,_id},{ new:true} );
    res.status(200).json(updatedPost);
    
}


export const deletePosts=async(req,res)=>{
  const { id }=req.params;
 
 if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No such Id was found!');

  await PostMessages.findByIdAndRemove(id);
 
  res.json({message:'Deleted Successfully'}); 

};