import pool from '../database/db.js';


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const getUserQuery = 'SELECT * FROM test WHERE email = $1 AND password = $2';
    const result = await pool.query(getUserQuery, [email, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const user = result.rows[0];

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    }); 
  } catch (error) {
    console.error('❌ Error logging in user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
