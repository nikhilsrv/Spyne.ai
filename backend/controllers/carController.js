import Car from "../models/carModel.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

export const uploadImages = async (req, res) => {
  try {
    const imageUrls = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      });
      imageUrls.push(result.secure_url);
      fs.unlinkSync(file.path);
    }

    res.status(200).json({ urls: imageUrls });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Failed to upload images" });
  }
};

export const addCar = async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;
    const {_id}=req.user;

    if (!title || !description || !tags || !images)
      return res.status(400).json({ error: "Please fill all the details" });

    const newCar = new Car({
      userId:_id,
      title,
      description,
      tags,
      images,
    });

    if (newCar) {
      await newCar.save();
      res.status(201).json({
        success:true,
        statusCode:201,
        message: "Car added successfully",
      });
    } else {
      res.status(400).json({ error: "Invalid car data" });
    }
  } catch (error) {
    console.log("Error in addcar controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const {id } = req.body;
    const response= await Car.findByIdAndDelete(id);

   return res.status(200).json({success:true,statusCode:200,message:"Car deleted successfully"})
  } catch (error) {
    console.log("Error in delete controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCarDetails = async (req, res) => {
  try {
    const {id,title,description,tags,images} = req.body;
    
    if (!id||!title || !description || !tags || !images)
      return res.status(400).json({ error: "Please fill all the details" });

   const response =await Car.findByIdAndUpdate(id,{title,description,tags,images})
   return res.status(200).json({success:true,statusCode:200,message:"Car updated successfully"})
  } catch (error) {
    console.log("Error in updatecar controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars =await  Car.find({ userId:_id });
    res.status(201).json({
       success:true,
       statusCode:200,
       cars
     });
  } catch (error) {
    console.log("Error in getAllCars controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCarDetails = async (req, res) => {
  try {
    const { id } = req.body;
    const car =await Car.findOne({ _id:id });
    res.status(201).json({
       success:true,
       statusCode:201,
       car
     });
  } catch (error) {
    console.log("Error in getCarDetails controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


