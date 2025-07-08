import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { FaPlus, FaTimes } from 'react-icons/fa';

const Todo = ({ socket, editTask, setEditTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [todoData, setTodoData] = useState({
        title: '',
        description: '',
        status: '',
        priority: ''
        // AssignedUser: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTodoData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        if (editTask) {
            setTodoData({
                title: editTask.title,
                description: editTask.description,
                status: editTask.status,
                priority: editTask.priority
            });
            setEditTaskId(editTask._id);
            setIsEditing(true);
            setIsModalOpen(true);
        }
    }, [editTask]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const localToken = localStorage.getItem("token");
        // console.log("🧾 Token during submit:", localToken);

        if (!localToken) {
            toast.error("Please login again!");
            // alert("❌ Please login again.");
            return;
        }
        try {
            if (isEditing) {
                // ✅ Update existing todo
                const res = await axios.put(
                    `${import.meta.env.VITE_API_BASE_URL}/api/auth/updatetodo/${editTaskId}`,
                    todoData,
                    {
                        headers: { Authorization: `Bearer ${localToken}` },
                        withCredentials: true
                    }
                );
                if (socket) {
                    socket.emit('update-todo', res.data);
                }
                toast.success("✅ Todo updated");
            } else {
                // 🆕 Add new todo
                const res = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/auth/addtodolist`,
                    todoData,
                    {
                        headers: { Authorization: `Bearer ${localToken}` },
                        withCredentials: true
                    }
                );

                if (socket) {
                    socket.emit('new-todo', res.data);
                }
                toast.success("✅ Todo added");
            }

            // 🧹 Reset all states
            setTodoData({
                title: '',
                description: '',
                status: '',
                priority: ''
            });
            setIsModalOpen(false);
            setIsEditing(false);
            setEditTaskId(null);
            setEditTask(null);

        } catch (err) {
            const backendMessage = err.response?.data?.message || err.message;
            toast.error(backendMessage);
        }
    };


    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md transition"
                >
                    <FaPlus /> ADD TODO
                </button>
            </div>

            {/* Add Event Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-br from-[#1e1e2f] to-[#0A1F24] p-6 rounded-lg w-full max-w-md relative">
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                setEditTask(null);
                                setIsEditing(false);
                                setEditTaskId(null);
                                setTodoData({                    // ✅ Reset form fields here
                                    title: '',
                                    description: '',
                                    status: '',
                                    priority: ''
                                });
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <FaTimes />
                        </button>

                        <h2 className="text-xl font-bold mb-4 text-white">Add To Do</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={todoData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2B0A3D] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={todoData.description}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2B0A3D] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={todoData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2B0A3D] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        required
                                    >
                                        <option value="" disabled>Select Status</option>
                                        <option value="todo">Todo</option>
                                        <option value="in Progress">In Progress</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Priority</label>
                                    <select
                                        name="priority"
                                        value={todoData.priority}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2B0A3D] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        required
                                    >
                                        <option value="" disabled>Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditTask(null);
                                        setIsEditing(false);
                                        setEditTaskId(null);
                                        setTodoData({                    // ✅ Reset form fields here
                                            title: '',
                                            description: '',
                                            status: '',
                                            priority: ''
                                        });
                                    }}
                                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition">
                                    {isEditing ? "Update To Do" : "Add To Do"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            )}
        </div >
    );
};

export default Todo;
