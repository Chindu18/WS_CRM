import pool from '../database/db.js';

// ✅ Add new user
export const addUser = async (req, res) => {
  const { name, email, password, role, status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO test (name, email, password, role, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, password, role, status]
    );

    res.status(201).json({
      success: true,
      message: "User added successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error inserting user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add user",
      error: error.message,
    });
  }
};



// ✅ Get all leads
export const getAllLeads = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM test ORDER BY name ASC');
    res.status(200).json({
      success: true,
      message: 'All leads fetched successfully',
      leads: result.rows,
    });
  } catch (err) {
    console.error('❌ Error fetching leads:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads',
    });
  }
};
