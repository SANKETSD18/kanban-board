import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import bitlogo from '../src/assets/bitlogo.gif';
import Todo from './Todo';
import DroppableColumn from './DroppableColumn';
import axios from 'axios';
import { io } from 'socket.io-client';
import { DndContext, closestCorners } from '@dnd-kit/core';

const Navbar = () => {
  const [name, setName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const socket = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize socket connection
    socket.current = io(import.meta.env.VITE_API_BASE_URL, {
      withCredentials: true,
      transports: ['websocket'],
    });

    socket.current.on('update-todo', (updatedTask) => {
      setTasks((prev) => {
        const existing = prev.find((task) => task._id === updatedTask._id);
        return existing
          ? prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
          : [...prev, updatedTask];
      });
    });

    socket.current.on('new-todo', (newTask) => {
      setTasks((prev) => [...prev, newTask]);
    });

    socket.current.on('delete-todo', (deletedId) => {
      setTasks((prev) => prev.filter((task) => task._id !== deletedId));
    });
    

    return () => {
      socket.current.disconnect();
    };
  }, []);
  // jab ye todo list fetch kr raha hai 
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/getTodolist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: true,
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('name');
    if (storedUsername) setName(storedUsername);
  }, []);

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status.toLowerCase() === status.toLowerCase());
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully!');
    navigate('/');
  };
// ye jab delete pr click krta hai to ye function kaam krta hai
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/auth/deletetodo/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Task deleted!');
      setTasks((prev) => prev.filter((t) => t._id !== id));

      if (socket) {
        socket.emit('delete-todo', id);
      }
    } catch (error) {
      toast.error('Failed to delete task');
      console.error(error);
    }
  };

  // ye dragkarne wala function
  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;
    
    
    // console.log("🔍 over", over);
    // console.log("🔍 over.data", over.data);
    // console.log("🔍 over.data.current", over.data?.current);


    const draggedTask = tasks.find((t) => t._id === active.id);
    const overTask = tasks.find((t) => t._id === over.id);
    const newColumn = over.data?.current?.column || overTask?.status;


    // console.log("🏁 DRAG END → active:", active.id, "→ over:", over.id);

    // console.log("🧭 New Column:", newColumn);

    if (!draggedTask || !newColumn || draggedTask.status === newColumn) return;

    const updatedTask = { ...draggedTask, status: newColumn };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/updatetodo/${active.id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setTasks((prev) =>
        prev.map((task) => (task._id === active.id ? res.data : task))
      );

      socket.current.emit('update-todo', res.data);
    } catch (err) {
      console.error('Failed to update', err);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* Navbar */}
      <nav className="flex items-center sticky top-0 z-50 bg-[#0A1F24] shadow-md justify-between  border-b border-gray-700 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img src={bitlogo} alt="Logo" className="h-7 w-7" />
          <span className="text-lg font-bold">Kanban Board</span>
        </div>
        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="h-8 w-8 rounded-full border border-pink-400"
            />
            <div className="text-sm leading-tight">
              <p>
                Hi, <span className="text-cyan-400">{name}</span>
              </p>
              <p className="text-xs text-gray-300">welcome back!</p>
            </div>
          </div>
        </div>
        <div>
          <button
            className="flex items-center gap-2 text-sm hover:text-pink-500 transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 overflow-auto p-4">
        <Todo socket={socket.current} editTask={editTask} setEditTask={setEditTask} />
        <h1 className="text-2xl text-center font-bold mt-6">To Do List</h1>

        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="flex gap-4 mt-6 rounded-xl p-3 bg-white/5 backdrop-blur-lg border border-white/10 min-h-[300px]">
            <DroppableColumn
              id="todo"
              title="To Do"
              tasks={getTasksByStatus('todo')}
              color="red"            
              onEdit={setEditTask}
              onDelete={handleDelete}
              
            />
            <DroppableColumn
              id="in-Progress"
              title="In Progress"
              tasks={getTasksByStatus('in Progress')}
              color="yellow"
              onEdit={setEditTask}
              onDelete={handleDelete}
            />
            <DroppableColumn
              id="done"
              title="Done"
              tasks={getTasksByStatus('done')}
              color="green"
              onEdit={setEditTask}
              onDelete={handleDelete}
            />
          </div>
        </DndContext>
      </main>
    </div>
  );
};

export default Navbar;
