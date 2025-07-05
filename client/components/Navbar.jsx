import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import bitlogo from '../src/assets/bitlogo.png';
import Todo from './Todo';
import Card from './Card';
import axios from 'axios';
import { io } from 'socket.io-client';

const Navbar = () => {
    const [name, setName] = useState('');
    const [tasks, setTasks] = useState([]);
    const socket = useRef(null);



    useEffect(() => {
        // ✅ Only initialize socket once
        socket.current = io(import.meta.env.VITE_API_BASE_URL, {
            withCredentials: true,
            transports: ['websocket'],
        });

        // 🔌 Listen for updates
        socket.current.on('new-todo', (newTask) => {
            setTasks((prev) => [...prev, newTask]);
        });

        return () => {
            // 🧹 Clean up on unmount
            socket.current.disconnect();
        };
    }, []);
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/getTodolist`
            , {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true
              })
            .then((res) => setTasks(res.data))
            .catch((err) => console.error('Error fetching tasks:', err));
    }, []);


    // 🔄 Filter tasks by status
    const getTasksByStatus = (status) => {
        return tasks.filter((task) => task.status === status);
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('name');
        if (storedUsername) {
            setName(storedUsername);
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#706b6b] to-[#0A1F24] text-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-4 py-3 border-b border-gray-700 relative">
                <div className="flex items-center gap-3">
                    <img src={bitlogo} alt="Logo" className="h-8 w-8" />
                    <span className="text-lg font-bold">YourApp</span>
                </div>

                <div className="flex items-center gap-4">
                    <FaCog className="text-lg cursor-pointer" />
                    <FaBell className="text-lg cursor-pointer" />
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
                {/* Logout Button at the Bottom */}
                <div >
                    <button className="flex items-center gap-5 text-sm hover:text-pink-500 transition" onClick={handleLogout}>
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </nav>

            {/* Content Area */}
            <main className="flex-1 overflow-auto p-4">
                <Todo  socket={socket.current} />

                {/* Kanban Columns */}
                <div className="flex gap-4 mt-6">
                    {/* todo */}
                    <div className="flex-1 bg-white rounded-lg shadow-lg">
                        <div className="p-4 space-y-4">
                            {getTasksByStatus('todo').map((task) => (
                                <Card key={task._id} {...task} color="red" />
                            ))}
                        </div>
                    </div>

                    {/* in progress */}
                    <div className="flex-1 bg-white rounded-lg shadow-lg">
                        <div className="p-4 space-y-4">
                            {getTasksByStatus('in Progress').map((task) => (
                                <Card key={task._id} {...task} color="yellow" />
                            ))}
                        </div>
                    </div>

                    {/* Done */}
                    <div className="flex-1 bg-white rounded-lg shadow-lg">

                        <div className="p-4 space-y-4">
                            {getTasksByStatus('done').map((task) => (
                                <Card key={task._id} {...task} color="green" />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Navbar;
