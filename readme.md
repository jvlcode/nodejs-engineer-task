# Project Setup

## Backend Setup

1. **Navigate to the `backend` directory:**
   ```
   cd backend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure MySQL database details:**
   - Edit `backend/db.js` to include your MySQL host, user, password, and database name.
   - Edit `backend/setupDatabase.js`  same DB details.

4. **Run the database setup script:**
   ```
   node setupDatabase.js
   ```

5. **Start the backend server:**
   ```bash
   node server.js
   ```
   The backend will run on port 8000.

## Frontend Setup

1. **Navigate to the `frontend` directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm start
   ```
   The frontend will run on port 3000.

## Summary

- **Backend:** Runs on `http://localhost:8000`
- **Frontend:** Runs on `http://localhost:3000`

Ensure both servers are running to use the full application.

