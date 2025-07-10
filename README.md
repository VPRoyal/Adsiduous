# 📘 Adsiduous: Multimedia Upload Web App

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#) [![Coverage Status](https://img.shields.io/badge/coverage-90%25-green.svg)](#)

Adsiduous is a fully‑featured **multimedia upload and management platform** with user authentication, file tagging & search, and a clean React‑based UI backed by a robust TypeScript/Express API.

---

## 🚀 Project Overview

- **Name:** Adsiduous  
- **Tagline:** Effortless Multimedia Upload & Discovery  
- **Status:** ✅ MVP Complete – Core auth, upload, search modules done  
- **Live Demo (FE):** _https://adsiduous-client.onrender.com_
- **API URL (BE):** _https://adsiduous.onrender.com_  
- **API Docs (Swagger):** `/api-docs`

---

## 🔧 Tech Stack

| Layer         | Technology                                                     |
| ------------- | -------------------------------------------------------------- |
| **Frontend**  | Vite · React · TypeScript · Tailwind CSS                       |
| **API Client**| Axios · js‑cookie · TypeScript                                 |
| **Backend**   | Node.js · Express · TypeScript                                 |
| **Database**  | MongoDB (via Mongoose)                                         |
| **File Storage**| Cloudinary                                                  |
| **Deployment**| Render (FE) · Render (BE) · MongoDB Atlas (DB)                 |

---

## 📁 Monorepo Structure

```

adsiduous/
├── client/                        # Next.js application
│   ├── public/
│   ├── src/
│   │   ├── assets/                #  Media Assets
│   │   ├── components/            #  UI components
│   │   ├── configs/               # Configuarations files
│   │   ├── constants/             # App constants
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── pages/                 # pages
│   │   ├── services/              # API calls
│   │   ├── store/                 # Redux Logic
│   │   ├── styles/                # Tailwind config & globals styles
│   │   ├── types/                 # Types for typescript
│   │   └── utils/                 # Utility functions
│   ├── App.tsx                    # Base component
│   ├── main.tsx                   # Entry Point
│   ├── routes.tsx                 # React Routing logics
│   ├── vite-env.d.ts
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── vite.config.ts
│
├── API/                       # Express API server/
│   ├── config/                # Configurations
│   ├── controllers/           # Controller logic
│   ├── middlewares/           # Middleware logic
│   ├── models/                # Database models
│   ├── routes/                # API Routes
│   ├── scripts/               # Script files
│   ├── types/                 # Type declarations 
│   ├── uploads/               # Folder for temp file upload
│   ├── utils/                 # Utilities folder
│   ├── .env                   # environment variable file
│   ├── app.ts                 # Express App logic
│   ├── server.ts              # Entry point
│   ├── package.json           # modules and script configs
│   └── tsconfig.json          # Typescript configs
└── README.md                      # ← You are here

````

---

## 🔄 Architecture Flow

```text
    ┌──────────────┐         HTTP(S)        ┌───────────────┐
    │   Frontend   │ ◄────────────────────► │ axiosInstance │
    └──────┬───────┘                        └──────┬────────┘
           │                                       │       Routing/API  
           ▼                                       ▼
    ┌──────────────┐                          ┌───────────────┐
    │Routing Logic │                          │  Express API  │
    └──────┬───────┘                          └──────┬────────┘
           │                                         │
     UI Components                                Controllers
           │                                         │
           ▼                                         ▼
    ┌──────────────┐                            ┌──────────────┐
    │ Tailwind     │                            │ FileService  │
    └──────────────┘                            └──────────────┘
                                                   │
                                                   ▼
                                              Database (MongoDB)
                                                   &
                                              File Storage (Cloudinary)
````

---

## ✨ Major Features

### 🔐 Authentication

* Email/password signup & login
* JWT stored in cookie via **js‑cookie**

### ☁️ File Upload

* Drag & drop or file picker
* Tags & metadata on upload
* Multipart/FormData to `/upload`

### 🔎 Search & Discovery

* Free‑text search, tag filters, pagination
* Typed query params via Axios

### 🛠 DRY & Modular API Client

* Well Strcutured folders and codebase logic
* Robust Central Error handling.
* Typescript enabled type checking for better security
* Endpoints: **AuthAPI**, **UploadAPI**, **SearchAPI**

---

## 📚 API Endpoints

| Method | Path                      | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| POST   | `/auth/login`             | Authenticate user & set JWT cookie |
| POST   | `/auth/register`          | Create new user                    |
| POST   | `/auth/logut`             | Logging out                        |
| GET    | `/auth/me`                | Get current authenticated user     |
| POST   | `/upload`                 | Upload file + tags                 |
| POST   | `/upload/multiple`        | Upload multiples file + tags       |
| GET    | `/search`                 | Search files (query, tags, page…)  |
| GET    | `/search/suggestions`     | Get autocomplete suggestions       |
| GET    | `/search/tags`            | Get all available tags & count     |
| GET    | `/files`                  | Get authenticated user's files     |
| GET    | `/files/:id`              | Get specific file by ID            |
| PUT    | `/files/:id/view`         | Increment file view count          |
| PUT    | `/files/:id`              | Update file metadata               |
| DELETE | `/files/:id`              | Delete file by ID                  |

---

## 🔗 Deployment & Local Setup

1. **Clone & install**

   ```bash
   git clone https://github.com/VPRoyal/Adsiduous.git
   cd adsiduous
   ```

2. **Configure**
   Copy `.env.example` → `.env` and fill in:
   * **Frontend**:
   ```
   VITE_API_BASE_URL=...
   ```
   * **Backend**:
   ```
   JWT_SECRET=...
   JWT_EXPIRE= ..
   MONGODB_URI=...
   FRONTEND_URL=...
   PORT=...
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   CLOUDINARY_FOLDER_NAME=...
   ```

3. **Run Locally**

   * **Frontend**:

     ```bash
     cd client
     npm run dev
     ```
   * **Backend**:

     ```bash
     cd backend
     npm run build && npm start
     ```

4. **Deploy**

   * Frontend → Vercel / Netlify / Render
   * Backend & DB → Railway / Render
   * File storage → AWS S3 / Cloudinary

---

## 👨‍💻 Author

**Vinay Pratap Singh**
🔗 [GitHub](https://github.com/VPRoyal) • 💼 Fullstack & Web3 Engineer • 🇮🇳

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
