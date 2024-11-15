import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags:[
        {
            type:String
        }
    ],
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const car = mongoose.model("car", carSchema);

export default car;
