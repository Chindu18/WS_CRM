import pool from '../database/db.js';

// ✅ Add new user
export const addUser = async (req, res) => {
  const { name, email, password, role, status } = req.body;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS test (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(50) NOT NULL,
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    // ✅ Ensure table exists
    await pool.query(createTableQuery);

    // ✅ Insert user
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


// ✅ Get all Team Leads (role = 'TL')
export const getAllTeamLeads = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name FROM test WHERE role = $1 ORDER BY name ASC',
      ['Team Lead']
    );

    res.status(200).json({
      success: true,
      message: 'All Team Leads fetched successfully',
      teamLeads: result.rows,
    });
  } catch (err) {
    console.error('❌ Error fetching Team Leads:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Team Leads',
    });
  }
};

// ✅ Get all Executives (role = 'Executive')
export const getAllExecutives = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name FROM test WHERE role = $1 ORDER BY name ASC',
      ['Sales Executive']
    );

    res.status(200).json({
      success: true,
      message: 'All Executives fetched successfully',
      executives: result.rows,
    });
  } catch (err) {
    console.error('❌ Error fetching Executives:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Executives',
    });
  }
};
