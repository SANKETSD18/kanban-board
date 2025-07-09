<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=26&pause=1000&color=00F700&center=true&width=600&lines=🧠+Real-Time+Kanban+Board;Built+with+React,+Socket.IO,+MongoDB" alt="Typing SVG" />
</h1>

<div align="center">

![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black&style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white&style=for-the-badge)
![DnD Kit](https://img.shields.io/badge/-DND%20Kit-000000?style=for-the-badge)
![Socket.io](https://img.shields.io/badge/-Socket.io-010101?logo=socket.io&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/-Express-black?logo=express&logoColor=white&style=for-the-badge)

</div>

---

## 📽️ Live Demo

🌐 [Click here to view the live project](http://kanban-board-lemon-six.vercel.app/)

## 🚀 Features

- 🔐 JWT-based **Login & Register**
- 🧠 **Real-Time Sync** of tasks across clients via Socket.IO
- 🔄 **Drag and Drop Columns & Tasks** using DnD Kit
- 🧹 Smart Task Cleanup and Conflict Handling
- 🎨 Stylish UI built with Tailwind CSS
- 💬 Toast notifications with `react-hot-toast`

---

## 🛠️ Tech Stack

| Frontend            | Backend          | Real-Time   | Auth      |
|---------------------|------------------|-------------|-----------|
| React 19 + Vite     | Node.js + Express| Socket.IO   | JWT       |
| DnD Kit             | Mongoose + MongoDB |            | bcryptjs  |
| Tailwind CSS        |                  |             | dotenv    |

---

## 📦 Installation

### 🔧 Prerequisites

- Node.js & npm
- MongoDB running locally or in the cloud (e.g., MongoDB Atlas)

---

### 🖥️ Frontend (Vite + React)

```bash
cd client
npm install
npm run dev
```

---

### 🧠 Backend (Express + Socket.IO)

```bash
cd server
npm install
npm run dev
```

---

### 🔐 Environment Variables

Create a `.env` file inside `/server`:

```
PORT=5000
MONGO_URL=your_mongo_connection_url
JWT_SECRET=your_secret_key
```

---

## 📁 Project Structure

```
/client        → React + Vite frontend  
/server        → Express backend with Socket.IO  
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE)

---

## 📬 Contact

Feel free to connect on [LinkedIn](http://linkedin.com/in/sanketsd18) or raise an issue!

---

### 🌀 Made with ❤️, WebSockets, and React Hooks