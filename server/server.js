import dotenv from "dotenv"
dotenv.config()

import express from "express"
import router from "./routes/index.js"
import mongoose from "mongoose"
import cors from "cors"


const app = express()

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

app.use(cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
        "Authorization",
        "content-type"
    ]
}))

app.use("/", router)

mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log("MongoDB connected successfully...")
}).catch(() => {
    console.log("Error while connecting MongoDB")
})

const port = 3000 || process.env.PORT
app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
})