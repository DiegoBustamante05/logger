import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
import CustomError from "./services/errors/custom-error.js";
import EErrors from "./services/errors/enums.js";
import multer from "multer";
import winston from "winston";



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(enviroment.MONGO_URL);
    logger.info("plug to mongo!");
  } catch (e) {
    CustomError.createError({
      name: "ERROR DATABASE",
      cause: "The database you are trying to access does not exist, please check if the link is correct.",
      message: "error connecting to database",
      code: EErrors.INVALID_TYPES_ERROR,
  },
  logger.error("error connecting to database")
  );
  }
}

import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);


export const enviroment = {mode: process.argv[2]}

import dotenv from 'dotenv';

if(process.argv[2] !='DEV' && process.argv[2] !='PROD') {
  logger.info("argument must be PROD or DEV");
  process.exit();
}
dotenv.config({
  path: process.argv[2] === 'DEV' ? './.env.development' : './.env.production',
});


export function generateMockProducts(count) {
  const mockProducts = [];
  for (let i = 1; i <= count; i++) {
    const product = {
      title: `Product ${i}`,
      description: `Description for Product ${i}`,
      price: Math.floor(Math.random() * 100) + 1,
      code: `AA${i}`,
      stock: Math.floor(Math.random() * 100),
      category: `Category ${Math.floor(Math.random() * 5) + 1}`,
      status: true,
    };
    mockProducts.push(product);
  }
  return mockProducts;
}

enviroment.PORT = process.env.PORT;
enviroment.MONGO_URL = process.env.MONGO_URL




export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.argv[2] === 'PROD' ? 'info' : 'debug',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ), 
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: process.argv[2] === 'PROD' ? 'error' : " ",
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
    }),
  ],
});