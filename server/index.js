import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'; // Importing auth routes
import cors from 'cors';



const app = express(); 
const server = http.createServer(app);

const allowedOrigins = [
  // 'http://localhost:5173',
  'https://kanban-board-ichigo.vercel.app',
  'https://kanban-board-git-master-ichigo.vercel.app',
  'https://kanban-board-mwnxc6ojs-ichigo.vercel.app',
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins, // ✅ Your frontend URL
    credentials: true,
  },
});
app.set('io', io);

io.on('connection', (socket) => {
  console.log('🟢 New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
 

// Use authentication and event management routes
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(5000, () => {
      console.log('✅ Server started at http://localhost:5000');
      });
  })
  .catch((err) => console.log(err));
