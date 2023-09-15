import dotenv from "dotenv"
import app from "./app.js";
import logger from "./configs/logger.config.js";
import mongoose from "mongoose";

dotenv.config()
//exit on mognodb error
mongoose.connection.on("error", (err) => {
    logger.error(`Mongodb connection error : ${err}`);
    process.exit(1);
  });
  
  //mongodb debug mode
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }


mongoose
  .connect(DATA_BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to Mongodb.");
  });

app.get("/",(req,res)=>{
    res.send("HELLO........")
})

const PORT =  process.env.PORT || 8000;

app.listen(PORT,()=>{
    logger.info(`server is runnin on ${PORT}`)
})