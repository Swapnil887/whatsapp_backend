import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js"
//dotEnv config
dotenv.config();

//create express app
const app = express();
console.log(process.env.NODE_ENV)



//morgan
// morgan will return the status code and route name and time
//  GET / 200 16.543 ms - 13
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//helmet
// Helmet.js is an open source JavaScript library that helps you secure your Node.js application by setting several HTTP headers. It acts as a middleware for Express and similar technologies, automatically adding or removing HTTP headers to comply with web security standards.
app.use(helmet());


//parse json request url
app.use(express.json());

//parse json request body
app.use(express.urlencoded({ extended: true }));

//sanitize request data
app.use(mongoSanitize());

//enable cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//cors
app.use(cors());


app.use("/api/v1",routes)



app.use(async(err,req,res,next)=>{
  res.status(err.status || 500);
  res.send({
    status:err.status || 500,
    message:err.message
  })
})

export default app