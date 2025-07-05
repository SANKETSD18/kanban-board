import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
import { User, Todo } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;
   

// Login User
export const loginUser  = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Find user
    const user = await User.findOne({ email  });
    if (!user) return res.status(404).json({ message: "User  not found" });
    
    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("✅ Password match:", isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    
    // 3. Generate token (if using JWT)
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    // 4. Send success response
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Add Todo
export const createTodo = async (req, res) => {
  const { title, description, status, priority } = req.body;

  try {
    const newTodo = new Todo({ title, description, status, priority });
    await newTodo.save();

    // 🔌 Socket emit
    const io = req.app.get('io');
    if (io) {
      io.emit('new-todo', newTodo); // 🔊 broadcast to all clients
    }

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get All Events
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find(); // 🧠 Get all todos from DB
    res.status(200).json(todos);     // ✅ Send as response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
