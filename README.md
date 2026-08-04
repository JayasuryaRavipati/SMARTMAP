# 🚚 SMARTMAP - Smart Delivery Route Optimization System

SMARTMAP is a delivery route optimization web application built for delivery drivers. It helps drivers manage deliveries, organize them based on priority, and optimize routes for faster and more efficient delivery.

## 📌 Project Overview

SMARTMAP simplifies daily delivery operations by allowing drivers to:

- Register and securely log in
- Add customer delivery details
- Manage deliveries
- View all assigned deliveries
- Optimize delivery order based on priority and distance
- Visualize deliveries on an interactive map (In Progress)

The application follows the **KISS (Keep It Simple, Stupid)** principle by providing an easy-to-use interface while implementing useful delivery management features.

---

# ✨ Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

### Dashboard
- Driver Dashboard
- Statistics Cards
- Quick Actions
- Navigation Sidebar
- Responsive Layout

### Delivery Management
- Add Delivery
- View All Deliveries
- Search Deliveries
- Filter by Priority
- Filter by Status
- View Delivery Details
- Delete Delivery

### Driver Profile
- Update Personal Information
- Vehicle Details
- Contact Information

### Route Optimization (Upcoming)
- Priority-based Sorting
- Distance Optimization
- Estimated Travel Time
- Optimized Delivery Sequence

### Map Integration (Upcoming)
- OpenStreetMap
- Leaflet Map
- Route Visualization
- Live Delivery Markers

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- React Icons
- React Toastify
- Leaflet
- React Leaflet
- CSS3

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- dotenv

---

# 📁 Project Structure

```
SMARTMAP
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── hooks
│   │   ├── styles
│   │   ├── utils
│   │   └── context
│   │
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/JayasuryaRavipati/SMARTMAP.git
```

Move into the project folder.

```bash
cd SMARTMAP
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server.

```bash
npm run dev
```

---

## Frontend Setup

Open a new terminal.

```bash
cd client
npm install
```

Run the frontend.

```bash
npm run dev
```

---

# ⚙ Environment Variables

Server `.env`

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
```

---

# 📸 Screens

- Splash Screen
- Login
- Register
- Dashboard
- Add Delivery
- My Deliveries
- Delivery Details
- Driver Profile

---

# 🔄 Workflow

```
Register/Login
        │
        ▼
Dashboard
        │
        ▼
Add Delivery
        │
        ▼
Save to MongoDB
        │
        ▼
My Deliveries
        │
        ▼
Optimize Route
        │
        ▼
Display Optimized Route
        │
        ▼
Complete Delivery
```

---

# 📈 Future Improvements

- Route Optimization Algorithm
- Live GPS Tracking
- Interactive Map
- Real-Time Notifications
- Delivery History
- Estimated Delivery Time
- Dark Mode
- Mobile Responsive UI
- Driver Analytics Dashboard
- Export Delivery Reports

---

# 🎯 Learning Outcomes

This project demonstrates knowledge of:

- Full Stack Web Development
- REST API Development
- JWT Authentication
- MongoDB CRUD Operations
- React State Management
- React Router
- Protected Routes
- Component-Based Architecture
- Responsive UI Design
- Delivery Management Systems

---

# 👨‍💻 Author

**Surya Ravipati**

GitHub:
https://github.com/JayasuryaRavipati

---

# 📄 License

This project is developed for educational and portfolio purposes.
