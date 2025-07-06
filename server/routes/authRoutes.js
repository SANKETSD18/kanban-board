import express from 'express';
import { loginUser, registerUser, createTodo, getAllTodos, deleteTodo, updateTodo } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js'



const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser); // ✅ यही जोड़ा जाए

// Event Management Routes
router.post('/addTodolist', verifyToken, createTodo);         // Add new event
router.get('/getTodolist', verifyToken, getAllTodos);      // Get all events
router.delete('/deletetodo/:id', verifyToken, deleteTodo);
router.put('/updatetodo/:id', verifyToken, updateTodo);

export default router;
