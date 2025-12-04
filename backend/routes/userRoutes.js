import express from 'express';
import {
  addUser,
  getAllLeads,
  getAllTeamLeads,
  getAllExecutives
} from '../controller/userController.js';

const userRouter = express.Router();

// POST route to add a user
userRouter.post('/add', addUser);

// GET all leads
userRouter.get('/getAllLeads', getAllLeads);

// GET all team leads
userRouter.get('/getAllTeamLeads', getAllTeamLeads);

// GET all executives
userRouter.get('/getAllExecutives', getAllExecutives);

export default userRouter;
