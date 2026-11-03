# ConnectHope — Social Development Events Platform

ConnectHope is a community-driven platform that connects people with social development activities. Users can discover upcoming events, join community initiatives, and contribute to making a positive impact.

## 🌐 Live Links

- **Frontend:** https://connect-hope-client-vd76-beryl.vercel.app/
- **Backend API:** https://connect-hope-server.vercel.app/
- **GitHub Client:** https://github.com/protap-paul/connect-hope-client
- **GitHub Server:** https://github.com/protap-paul/connect-hope-server

## ✨ Key Features

1. **User Authentication:** Secure registration and login using Better Auth.
2. **Upcoming Events:** Browse upcoming social development events.
3. **Event Details:** View detailed information about individual events.
4. **Join Events:** Authenticated users can join community events.
5. **Create Events:** Logged-in users can create new social events.
6. **Manage Events:** Event creators can update or delete their own events.
7. **Joined Events:** Users can view and manage events they have joined.
8. **User Profile:** View and update personal profile information.
9. **Responsive Design:** Accessible across desktop, tablet, and mobile devices.
10. **Theme Support:** Light and dark mode support.

## 🛠️ Technologies Used

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Better Auth

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- JOSE

## 📦 Installation and Setup

### 1. Clone the Frontend Repository

```bash
git clone https://github.com/protap-paul/connect-hope-client.git
cd connect-hope-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the frontend root directory:

```env
NEXT_PUBLIC_API_URL=https://connect-hope-server.vercel.app
```

### 4. Run the Frontend

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## ⚙️ Backend Setup

### 1. Clone the Backend Repository

```bash
git clone https://github.com/protap-paul/connect-hope-server.git
cd connect-hope-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend root directory and configure:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=connectHope
AUTH_BASE_URL=your_better_auth_base_url
CLIENT_URL=your_frontend_url
```

Use your actual MongoDB connection string and deployment URLs.

### 4. Run the Backend

```bash
npm run dev
```

The backend server will run at http://localhost:5000.

## 🔐 Authentication

ConnectHope uses Better Auth for user authentication and JWT-based authorization for protecting backend API endpoints.

Protected operations require a valid authentication token.

## 📁 Project Structure

```text
connect-hope-client/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
├── .env.local
└── package.json
```

## 🎯 Project Purpose

ConnectHope aims to encourage community participation in social development activities by making it easier for people to discover, organize, and join meaningful events.

## 👨‍💻 Developer

**Protap Paul**

Full Stack Developer

GitHub: https://github.com/protap-paul
