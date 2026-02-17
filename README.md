# SwiftRide - Ride Sharing App

A full-stack ride-sharing application built with the MERN stack (MongoDB, Express, React, Node.js). This project facilitates ride booking and management for both riders and drivers.

## 🚀 Features

- **User Roles**: Separate interfaces for Riders and Drivers.
- **Authentication**: Secure signup and login with JWT and HttpOnly cookies.
- **Real-time Updates**: (Mention if any, e.g., socket.io, otherwise omit for now or keep generic).
- **Dashboards**: Dedicated dashboards for managing rides and profile.
- **Protected Routes**: Secure navigation ensuring only authenticated users access specific pages.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router DOM.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose Application).
- **Authentication**: JSON Web Tokens (JWT), BCrypt.

## 📦 Installation & Running

### Prerequisites

- Node.js installed
- MongoDB installed or a MongoDB Atlas connection string

### 1. Clone the Repository

```bash
git clone <repository_url>
cd SwiftRide(Ride Sharing App)
```

### 2. Backend Setup (Server)

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
JWT_EXPIRE=1d
COOKIE_EXPIRE=1
```

Start the server:

```bash
npm run dev
```

### 3. Frontend Setup (Client)

Navigate to the client directory and install dependencies:

```bash
cd ../client
npm install
```

Start the client development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🤝 Contribution

Feel free to fork this repository and submit pull requests.
