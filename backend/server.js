import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './database/db.js';
import userRoutes from './routes/userRoutes.js';
import { loginUser } from './controller/loginController.js';
import loginRouter from './routes/LogIn.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing JSON data

// Routes
app.use('/api/login', loginRouter);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send("CRM BACKEND SERVER RUN");
});

// Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
