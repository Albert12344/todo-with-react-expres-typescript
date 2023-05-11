import express from 'express';
import { Router } from 'express';
import { postTodos, getTodos, deleteTodos } from './Details'

const router = Router()

router.post('/todos', postTodos)
router.get('/todos', getTodos)
router.delete('/todos/:id', deleteTodos)

export default router