import express, { Request, Response } from 'express';
import todoModel from '../Mongodb/Schema';

export async function postTodos(req: Request, res: Response) {
    const {text, status} = req.body
    
    try{
      await todoModel.create({
          text,
          status
      })
      return res.status(200).send(text)
    } 
    catch(error) {
        console.log(error)
    }
};
  
export async function getTodos (req: Request, res: Response) {
  try {
    const getInfo = await todoModel.find().lean();
    if (getInfo) {
      return res.status(200).send(getInfo);
    }
      return res.status(404).json({ error: 'Todo not found' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
  
export async function deleteTodos(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedTodo = await todoModel.findByIdAndDelete(id);
    if (deletedTodo) {
      return res.status(200).json({ message: 'Todo removed successfully' });
    }
      return res.status(404).json({ error: 'Todo not found' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};