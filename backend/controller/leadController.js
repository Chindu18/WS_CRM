import pool from "../database/db.js";

// ✅ Ensure table exists before use
const ensureLeadsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      email VARCHAR(100),
      source VARCHAR(50),
      priority VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
  await pool.query(createTableQuery);
};

// ✅ Add a new lead
export const addLead = async (req, res) => {
  const { name, phone, email, source, priority } = req.body;

  try {
    await ensureLeadsTable(); // auto-create table if missing

    const result = await pool.query(
      `INSERT INTO leads (name, phone, email, source, priority)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, phone, email, source, priority]
    );

    res.status(201).json({
      success: true,
      message: "Lead added successfully",
      lead: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error adding lead:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add lead",
    });
  }
};

// ✅ Get all leads
export const getAllLeads = async (req, res) => {
  try {
    await ensureLeadsTable();

    const result = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
    res.status(200).json({
      success: true,
      leads: result.rows,
    });
  } catch (error) {
    console.error("❌ Error fetching leads:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};

// ✅ Update a lead
export const updateLead = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, source, priority } = req.body;

  try {
    await ensureLeadsTable();

    const result = await pool.query(
      `UPDATE leads 
       SET name = $1, phone = $2, email = $3, source = $4, priority = $5
       WHERE id = $6
       RETURNING *`,
      [name, phone, email, source, priority, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error updating lead:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update lead",
    });
  }
};
