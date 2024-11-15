import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import generateTokenAndSetCookie from "../utils/tokens.js";

export const signup = async (req, res) => {
	try {
		const { fullName, emailId, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ emailId });
		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}

		//encrypt password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			emailId,
			password: hashedPassword,
		});

		if (newUser) {
			// Generate JWT token here
			await newUser.save();
			const token = generateTokenAndSetCookie(newUser._id, res);

			res.status(201).json({
				success:true,
				statusCode:201,
				message:"User signed up successfully",
				fullName: newUser.fullName,
				emailId,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { emailId, password } = req.body;
		const user = await User.findOne({ emailId });

		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		const token = generateTokenAndSetCookie(user._id, res);
		res.status(200).json({
			success:true,
			statusCode:200,
			message:"User logged in successfully",
			fullName: user.fullName,
			emailId,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ success:true,statusCode:200,message: "User logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}; 


