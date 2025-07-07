// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
// import toast from 'react-hot-toast';
// import bitlogo from '../src/assets/bitlogo.png';
// import Todo from './Todo';
// import Card from './Card';
// import DroppableColumn from './DroppableColumn';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// import {
//     DndContext,
//     closestCorners,
// } from '@dnd-kit/core';




// const Navbar = () => {
//     const [name, setName] = useState('');
//     const [tasks, setTasks] = useState([]);

//     const [editTask, setEditTask] = useState(null);
//     const socket = useRef(null);

//     const navigate = useNavigate();


//     useEffect(() => {
//         // ✅ Only initialize socket once
//         socket.current = io(import.meta.env.VITE_API_BASE_URL, {
//             withCredentials: true,
//             transports: ['websocket'],
//         });

//         socket.current.on('update-todo', (updatedTask) => {
//             setTasks((prev) => {
//               const existing = prev.find((task) => task._id === updatedTask._id);
//               if (existing) {
//                 // Replace updated task
//                 return prev.map((task) =>
//                   task._id === updatedTask._id ? updatedTask : task
//                 );
//               } else {
//                 // If new (edge case), add it
//                 return [...prev, updatedTask];
//               }
//             });
//           });
//         // 🔌 Listen for updates
//         socket.current.on('new-todo', (newTask) => {
//             setTasks((prev) => [...prev, newTask]);
//         });
    

//         return () => {
//             // 🧹 Clean up on unmount
//             socket.current.disconnect();
//         };
//     }, []);

    

//     useEffect(() => {
//         axios
//             .get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/getTodolist`
//                 , {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     },
//                     withCredentials: true
//                 })
//             .then((res) => setTasks(res.data))
//             .catch((err) => console.error('Error fetching tasks:', err));
//     }, []);


//     // 🔄 Filter tasks by status
//     const getTasksByStatus = (status) => {
//         return tasks.filter((task) => task.status === status);
//     };

//     useEffect(() => {
//         const storedUsername = localStorage.getItem('name');
//         if (storedUsername) {
//             setName(storedUsername);
//         }
//     }, []);

//     // logout buttuon pr hone wala fuction
//     const handleLogout = () => {
//         localStorage.removeItem('name');
//         localStorage.removeItem('email');
//         localStorage.removeItem('token');
//         toast.success("Logged out successfully!");
//         navigate('/');
//     }

//     const handleDelete = async (id) => {
//         try {
//             const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/auth/deletetodo/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });

//             toast.success("Task deleted!");
//             setTasks((prev) => prev.filter((t) => t._id !== id)); // UI update
//         } catch (error) {
//             toast.error("Failed to delete task");
//             console.error(error);
//         }
//     };

//     const handleDragEnd = async ({ active, over }) => {
//         if (!over || active.id === over.id) return;

//         const draggedTask = tasks.find(t => t._id === active.id);
//         if (!draggedTask) return;

//         const newColumn = over.data?.current?.column;
//         if (!newColumn || draggedTask.status === newColumn) return;

//         const updatedTask = {
//             ...draggedTask,
//             status: newColumn,
//         };

//         console.log("Dragged:", active.id);
//         console.log("Dropped on:", over.id);
//         console.log("Dropped Column:", over.data?.current?.column);

//         try {
//             const res = await axios.put(
//                 `${import.meta.env.VITE_API_BASE_URL}/api/auth/updatetodo/${active.id}`,
//                 updatedTask,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 }
//             );

//             setTasks(prev =>
//                 prev.map(task =>
//                     task._id === active.id ? res.data : task
//                 )
//             );

//             socket.current.emit('update-todo', res.data);
//         } catch (err) {
//             console.error("Failed to update", err);
//         }
//     };




//     return (
//         <div className="min-h-screen flex flex-col  bg-gradient-to-br from-[#e70000] to-[#0A1F24] text-white">
//             {/* Navbar */}
//             <nav className="flex items-center sticky top-0 z-50 bg-[#0A1F24] shadow-md justify-between px-4 py-3 border-b border-gray-700 ">
//                 <div className="flex items-center gap-3">
//                     <img src={bitlogo} alt="Logo" className="h-8 w-8" />
//                     <span className="text-lg font-bold">YourApp</span>
//                 </div>

//                 <div className="flex items-center gap-4">
//                     <FaCog className="text-lg cursor-pointer" />
//                     <FaBell className="text-lg cursor-pointer" />
//                     <div className="flex items-center gap-2">
//                         <img
//                             src="https://i.pravatar.cc/40"
//                             alt="User"
//                             className="h-8 w-8 rounded-full border border-pink-400"
//                         />
//                         <div className="text-sm leading-tight">
//                             <p>
//                                 Hi, <span className="text-cyan-400">{name}</span>
//                             </p>
//                             <p className="text-xs text-gray-300">welcome back!</p>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Logout Button at the Bottom */}
//                 <div >
//                     <button className="flex items-center gap-5 text-sm hover:text-pink-500 transition" onClick={handleLogout}>
//                         <FaSignOutAlt />
//                         Logout
//                     </button>
//                 </div>
//             </nav>

//             {/* Content Area */}
//             <main className="flex-1 overflow-auto p-4">
//                 <Todo socket={socket.current} editTask={editTask} setEditTask={setEditTask} />
//                 <div>
//                     <h1 className="text-2xl text-center font-bold text-white">To Do List</h1>
//                 </div>

//                 {/* Kanban Columns */}

//                 <div className="flex gap-4 mt-6 bg-amber-800">
//                     {/* todo */}
//                     {/* <div className="flex-1 bg-white rounded-lg shadow-lg">
//                         <div className="p-4 space-y-4">
//                             <h2 className="text-xl text-center font-semibold text-black mb-2">To Do</h2>
//                             {getTasksByStatus('todo').map((task) => (
//                                 <Card key={task._id} task={task} color="red" onEdit={(task) => setEditTask(task)}
//                                     onDelete={handleDelete} />
//                             ))}
//                         </div>
//                     </div> */}

//                     {/* in progress */}
//                     {/* <div className="flex-1 bg-white rounded-lg shadow-lg">
//                         <div className="p-4 space-y-4">
//                             <h2 className="text-xl text-center font-semibold text-black mb-2">In Progress</h2>
//                             {getTasksByStatus('in Progress').map((task) => (
//                                 <Card key={task._id} task={task} color="yellow"
//                                     onEdit={(task) => setEditTask(task)}
//                                     onDelete={handleDelete} />
//                             ))}
//                         </div>
//                     </div> */}

//                     {/* Done */}
//                     {/* <div className="flex-1 bg-white rounded-lg shadow-lg">

//                         <div className="p-4 space-y-4">
//                             <h2 className="text-xl text-center font-semibold text-black mb-2">Done</h2>
//                             {getTasksByStatus('done').map((task) => (
//                                 <Card key={task._id} task={task} color="green" onEdit={(task) => setEditTask(task)}
//                                     onDelete={handleDelete} />
//                             ))}
//                         </div>
//                     </div> */}



//                     <DndContext

//                         collisionDetection={closestCorners}
//                         onDragStart={({ active }) => {
//                             console.log("Drag started:", active);
//                         }}
//                         onDragEnd={handleDragEnd}
//                     >
//                         <div className="flex gap-4 mt-6">
//                             {/* To Do */}
//                             <DroppableColumn
//                                 id="todo"
//                                 title="To Do"
//                                 tasks={getTasksByStatus('todo')}
//                                 color="red"
//                                 onEdit={setEditTask}
//                                 onDelete={handleDelete}
//                             />

//                             {/* In Progress */}
//                             <DroppableColumn
//                                 id="in Progress"
//                                 title="In Progress"
//                                 tasks={getTasksByStatus('in Progress')}
//                                 color="yellow"
//                                 onEdit={setEditTask}
//                                 onDelete={handleDelete}
//                             />

//                             {/* Done */}
//                             <DroppableColumn
//                                 id="done"
//                                 title="Done"
//                                 tasks={getTasksByStatus('done')}
//                                 color="green"
//                                 onEdit={setEditTask}
//                                 onDelete={handleDelete}
//                             />
//                         </div>
//                     </DndContext>
//                 </div>

//             </main>
//         </div>
//     );
// };

// export default Navbar;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import bitlogo from '../src/assets/bitlogo.png';
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

    return () => {
      socket.current.disconnect();
    };
  }, []);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/auth/deletetodo/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Task deleted!');
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      toast.error('Failed to delete task');
      console.error(error);
    }
  };

  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const draggedTask = tasks.find((t) => t._id === active.id);
    const newColumn = over.data?.current?.column;

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e70000] to-[#0A1F24] text-white">
      {/* Navbar */}
      <nav className="flex items-center sticky top-0 z-50 bg-[#0A1F24] shadow-md justify-between px-4 py-3 border-b border-gray-700">
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
          <div className="flex gap-4 mt-6">
            <DroppableColumn
              id="todo"
              title="To Do"
              tasks={getTasksByStatus('todo')}
              color="red"
              onEdit={setEditTask}
              onDelete={handleDelete}
            />
            <DroppableColumn
              id="in Progress"
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
