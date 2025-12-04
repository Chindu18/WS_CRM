import express from 'express';
import {addUser, getAllLeads } from '../controller/userController.js';

const userRouter = express.Router();

// POST route to add a user
userRouter.post('/add', addUser);
userRouter.get('/getAllLeads',getAllLeads);

export default userRouter;
