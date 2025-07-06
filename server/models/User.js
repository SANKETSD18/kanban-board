import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // bcrypt not used here, but okay if needed elsewhere

// ✅ 1. User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
});

// ✅ 2. Todo Schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description must not exceed 500 characters'],
    default: ''
  },
  status: {
    type: String,
    enum: ['todo', 'in Progress', 'done'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
}, { timestamps: true });

// ✅ 3. Model Definitions
const User = mongoose.model('User', userSchema, 'userlogin'); // 👈 Force collection name as 'userlogin'
const Todo = mongoose.model('Todo', todoSchema, 'todolist' ); // 👈 Will create 'todos' collection

// ✅ 4. Export models
export { User, Todo };
