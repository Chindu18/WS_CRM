import express from "express";
import { addLead, getAllLeads, updateLead } from "../controller/leadController.js";

const leadRouter = express.Router();

// POST new lead
leadRouter.post("/add", addLead);

// GET all leads
leadRouter.get("/all", getAllLeads);

// PUT update lead
leadRouter.put("/update/:id", updateLead);

export default leadRouter;
