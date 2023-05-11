import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const todoCollection = require('./Schema')
const cors = require('cors')
require('./Mongodb').connect()
dotenv.config();

const app: Express = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const port = process.env.PORT;

app.post('/todo', (req: Request, res: Response) => {
  const {todos, index} = req.body
  try{
      todoCollection.create({
          todos,
          index
      })
      return res.status(200).send(todos)
  } 
  catch(error) {
      console.log(error)
  }
});

app.get('/gettodo', async (req, res) => {
  try {
    const getInfo = await todoCollection.find().lean();
    if (getInfo) {
      return res.status(200).send(getInfo);
    } else {
      return res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/deletetodo/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTodo = await todoCollection.findByIdAndDelete(id);
    if (deletedTodo) {
      return res.status(200).json({ message: 'Todo removed successfully' });
    } else {
      return res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running with typescript`);
});