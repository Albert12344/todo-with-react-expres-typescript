import express from 'express';
import { Router } from 'express';
import { postTodos, getTodos, deleteTodos, editTodos } from './Details'

const router = Router()

router.post('/todos', postTodos)
router.get('/todos', getTodos)
router.delete('/todos/:id', deleteTodos)
router.put('/todos/:id', editTodos)

export default router