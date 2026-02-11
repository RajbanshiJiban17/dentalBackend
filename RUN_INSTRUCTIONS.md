# Run Instructions - Dental Appointment System

Follow these steps to set up and run the Dental Appointment System locally.

## Prerequisites
- **Node.js**: v14+ recommended
- **MySQL**: Running on localhost (standard port 3306)

## 1. Database Setup
1. Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin, or CLI).
2. Create a new database:
   ```sql
   CREATE DATABASE dental_appointment;
   ```

## 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd "Dental Appointment/backend"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Open `.env` and verify the `DB_USER` and `DB_PASSWORD` match your MySQL credentials.
4. Scale the database and seed initial data:
   ```bash
   node src/seeders/seed.js
   ```
   > [!NOTE]
   > This command will create the tables and add an admin account, two dentists, and several services.

5. Start the server:
   ```bash
   npm run start
   ```
   The server will run on `http://localhost:5000`.

## 3. Frontend Setup
1. Navigate to the `frontend` directory.
2. Since this is a vanilla JS project, you just need to serve it. You can use any static server or simply open `index.html` in your browser (though using a server is recommended to avoid CORS issues if not configured correctly).
3. Recommended (using `live-server` or `serve`):
   ```bash
   npx live-server
   ```
   Or simply open the project in VS Code and use the "Live Server" extension.

## 4. Test Accounts
- **Admin**: `admin@dental.com` / `admin123`
- **Dentist**: `john@dental.com` / `dentist123`
- **Patient**: Register a new account via the UI.

## Features implemented:
- [x] **Premium Design System**: Mobile-first, responsive, and aesthetically pleasing using Outfit font and glassmorphism.
- [x] **RBAC Protected routes**: Secure access based on JWT roles.
- [x] **Slot Validation**: Real-time check to prevent double booking of dentists using MySQL transactions.
- [x] **Timezone Aware**: Configured for `Asia/Kathmandu`.
