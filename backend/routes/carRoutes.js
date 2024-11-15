import express from "express";
import {addCar, deleteCar, getAllCars, getCarDetails, updateCarDetails, uploadImages} from "../controllers/carController.js";
import {upload} from "../config/multer.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router();

router.post("/uploadImages",upload.array('images',10),uploadImages);
router.post("/addCar",protectRoute,addCar);
router.get("/getAllCars",protectRoute, getAllCars);
router.post("/getCarDetails",protectRoute,getCarDetails);
router.put("/updateCarDetails",protectRoute,updateCarDetails);
router.delete("/deleteCar",protectRoute,deleteCar)
export default router;