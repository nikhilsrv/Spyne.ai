import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		emailId: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			minlength: 6,
		},
	}, { timestamps: true }
);

const user = mongoose.model("user", userSchema);

export default user;