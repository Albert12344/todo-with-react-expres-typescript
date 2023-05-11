import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import Route from './Elements/Routes/Routes'
require('./Elements/Mongodb/Mongodb').connect()
dotenv.config();

const app: Express = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(process.env.PORT)

app.use('/', Route)