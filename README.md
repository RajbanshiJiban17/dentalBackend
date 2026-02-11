# Dental.com - Dental Appointment System

Welcome to the **Dental.com** Dental Appointment System. This is a full-stack web application designed for managing patients, dentists, services, and online appointments.

## 🌐 Official Site: [www.dental.com](http://www.dental.com) (Branding)

---

## 🚀 Deployment Instructions

This system is configured for automated deployment using **Render** (Backend) and **Netlify** (Frontend).

### 1. Backend (Render)
- **Repo**: [RajbanshiJiban17/dentalBackend](https://github.com/RajbanshiJiban17/dentalBackend.git)
- **Deployment Method**: [Render Blueprints](https://dashboard.render.com/blueprints).
- **Steps**:
    1. Connect your GitHub.
    2. Input Database Environment Variables (DB_HOST, DB_USER, etc.).
    3. Click **Apply**.

### 2. Frontend (Netlify)
- **Deployment Method**: Connect GitHub to Netlify.
- **Auto-Config**: Netlify will use the `netlify.toml` automatically.

### 3. Database (Aiven/MySQL)
- Recommended: [Aiven.io](https://aiven.io/) for a free-tier MySQL database.

---

## 🛠 Features
- **Patient Dashboard**: Book appointments, view history.
- **Dentist Dashboard**: Manage slots, view scheduled patients.
- **Admin Panel**: Manage services, dentists, and users.
- **Role-based Access**: Secure JWT authentication.

## 🗄 Database Design
The system uses a MySQL relational database. You can find the ERD and Schema details in the `README.md` history or the documentation.

---

## 📝 Setup for Local Development
1. **Backend**: 
   ```bash
   cd backend
   npm install
   npm run dev
   ```
2. **Frontend**:
   ```bash
   cd frontend
   # Open index.html or use a live server
   ```

---

*Note: www.dental.com is used here as a branding identifier. To use the actual domain, you must purchase it from a domain registrar and link it to your Netlify/Render hosting.*
