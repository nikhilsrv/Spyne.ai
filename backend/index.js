import express from "express"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import carRoutes from "./routes/carRoutes.js"
import dotenv from "dotenv"
import dbconnection from "./config/dbconnection.js";
import cors from "cors"
import bodyParser from "body-parser";


const app = express();
dotenv.config();
app.use(cors({
    origin: ["http://localhost:3000","https://beautiful-profiterole-c872bf.netlify.app"],
}));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json({limit:'50mb'}))

const PORT=process.env.PORT||8000;
app.use(express.json())
app.use(cookieParser());


app.use("/api/user", userRoutes)
app.use("/api/cars",carRoutes);

app.get("/",(req,res)=>{
    res.send("https://beautiful-profiterole-c872bf.netlify.app")
})

dbconnection();

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})


