# Deployment Guide - Dental Appointment System (Free Tier)

This guide explains how to deploy the full-stack system for free using modern cloud services.

## Recommended Free Stack
| Component | Service | Why? |
| :--- | :--- | :--- |
| **Backend** | [Render](https://render.com/) | Easiest for Express/Node.js. |
| **Database** | [Aiven](https://aiven.io/) | Reliable free tier for MySQL. |
| **Frontend** | [Netlify](https://www.netlify.com/) | Best for static HTML/JS sites. |

---

## 1. Deploy the Database (Aiven)
1. Sign up for a free account at [Aiven.io](https://aiven.io/).
2. Create a new **MySQL** service on the **Free Tier**.
3. Once the service is running, copy the **Service URI** or the individual connection details (Host, Port, User, Password).
4. Run the seeder locally but point it to this new database by updating your `.env` temporarily to ensure tables are created.

## 2. Deploy the Backend (Render)
1. Push your `backend` folder to a **GitHub** repository.
2. Log in to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository and select the `backend` directory.
4. Set the **Environment Variables** in Render:
   - `DB_HOST`: (From Aiven)
   - `DB_USER`: (From Aiven)
   - `DB_PASSWORD`: (From Aiven)
   - `DB_NAME`: (From Aiven)
   - `JWT_SECRET`: (Your secret key)
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render's default)
5. **Important**: Change `API_URL` in your frontend `js/api.js` to point to your new Render URL (e.g., `https://dental-api.onrender.com/api`).

## 3. Deploy the Frontend (Netlify)
1. Push your `frontend` folder to the same (or a new) GitHub repository.
2. Log in to [Netlify](https://www.netlify.com/) and click **Add new site** > **Import an existing project**.
3. Connect your GitHub and select the `frontend` directory.
4. Set the **Build Command** to: (Leave empty for static sites).
5. Set the **Publish Directory** to: `.` (or specifically where `index.html` is).
6. Click **Deploy Site**.

## 4. Final Verification
1. Open your Netlify URL.
2. Try to register a new account.
3. Verify that the frontend is successfully communicating with your Render backend.

> [!TIP]
> **Free Tier Sleep Mode**: Render's free tier spins down after 15 minutes of inactivity. The first request after a break might take 30-60 seconds to respond. This is normal for free hosting.

> [!WARNING]
> **CORS**: Ensure that the `cors` middleware in your backend `server.js` allows your Netlify domain. You can update it to:
> ```javascript
> app.use(cors({ origin: 'https://your-netlify-site.netlify.app' }));
> ```
