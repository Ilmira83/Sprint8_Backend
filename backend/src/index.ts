import dotenv from 'dotenv';

//configure the environment variables
dotenv.config();

import Server from "./models/server";

console.log('ENV TEST:', process.env.DATABASE, process.env.DB_USER, process.env.PASSWORD);

const server = new Server();