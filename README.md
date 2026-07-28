# 🚚 SMARTMAP

SMARTMAP is a full-stack MERN web application designed to streamline delivery management and route optimization. It enables administrators to manage deliveries, assign drivers, and monitor delivery locations on an interactive map, while drivers can view their assigned deliveries and update delivery statuses.

## ✨ Features

### 🔐 Authentication
- User Registration
- Secure Login (JWT)
- Forgot Password
- Reset Password
- Protected Routes
- Logout

### 📊 Dashboard
- Delivery Statistics
- Interactive Dashboard
- Responsive Sidebar
- User Profile

### 📦 Delivery Management
- Add Delivery
- View Deliveries
- Update Delivery Status
- Delete Delivery
- Assign Drivers

### 🚛 Driver Module
- Driver Dashboard
- Assigned Deliveries
- Delivery Tracking

### 🗺️ Maps & Routing
- Interactive Map using Leaflet
- OpenStreetMap Integration
- Delivery Location Selection
- Current Driver Location
- Route Visualization

### 🔒 Security
- JWT Authentication
- Password Encryption (bcrypt)
- Protected APIs
- Environment Variables

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- React Hook Form
- React Toastify
- Framer Motion
- React Icons
- Leaflet
- React Leaflet

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Socket.IO
- CORS
- Cookie Parser

---

## 📁 Project Structure

```
SMARTMAP/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/<your-username>/SMARTMAP.git
```

### Navigate into the project

```bash
cd SMARTMAP
```

### Install dependencies

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Run the Project

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

```bash
cd client
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:5000
```

---

## 📌 API Endpoints

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/profile`

### Deliveries

- `GET /api/deliveries`
- `POST /api/deliveries`
- `PUT /api/deliveries/:id`
- `DELETE /api/deliveries/:id`
- `GET /api/deliveries/my-deliveries`

### Users

- `GET /api/users/drivers`

---

## 🚀 Future Enhancements

- Live Driver Tracking
- Route Optimization Algorithm
- Real-Time Notifications
- Google Maps Integration
- Delivery Analytics
- Admin Reports
- Mobile Application
- Dark Mode
- Multi-language Support

---

## 👨‍💻 Author

**Surya Ravipati**

- Full Stack Developer
- MERN Stack Developer
- React Developer

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you like this project, don't forget to **star** the repository!
