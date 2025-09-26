const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'property_management',
  port: process.env.DB_PORT || 3306
};

let db;

async function connectDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    
    // Check if user exists
    const [existingUsers] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = require('uuid').v4();
    
    // Insert user
    await db.execute(
      'INSERT INTO users (id, email, password_hash, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, email, passwordHash, firstName, lastName, role]
    );
    
    // Generate token
    const token = jwt.sign(
      { userId, email, role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    const user = {
      id: userId,
      email,
      firstName,
      lastName,
      role,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const [users] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      createdAt: user.created_at
    };
    
    res.json({ user: userData, token });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Properties routes
app.get('/api/properties', authenticateToken, async (req, res) => {
  try {
    const [properties] = await db.execute('SELECT * FROM properties ORDER BY created_at DESC');
    res.json(properties);
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/properties', authenticateToken, async (req, res) => {
  try {
    const propertyId = require('uuid').v4();
    const {
      name, address, city, state, zipCode, type, bedrooms, bathrooms,
      sqft, rent, deposit, description, amenities, images
    } = req.body;
    
    await db.execute(
      `INSERT INTO properties (id, name, address, city, state, zip_code, type, 
       bedrooms, bathrooms, sqft, rent, deposit, description, amenities, images) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [propertyId, name, address, city, state, zipCode, type, bedrooms, bathrooms,
       sqft, rent, deposit, description, JSON.stringify(amenities), JSON.stringify(images)]
    );
    
    res.status(201).json({ id: propertyId, message: 'Property created successfully' });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Tenants routes
app.get('/api/tenants', authenticateToken, async (req, res) => {
  try {
    const [tenants] = await db.execute('SELECT * FROM tenants ORDER BY created_at DESC');
    res.json(tenants);
  } catch (error) {
    console.error('Get tenants error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/tenants', authenticateToken, async (req, res) => {
  try {
    const tenantId = require('uuid').v4();
    const {
      firstName, lastName, email, phone, emergencyContact, emergencyPhone,
      propertyId, unit, leaseStart, leaseEnd, rent, deposit, notes, avatar
    } = req.body;
    
    await db.execute(
      `INSERT INTO tenants (id, first_name, last_name, email, phone, emergency_contact,
       emergency_phone, property_id, unit, lease_start, lease_end, rent, deposit, notes, avatar)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [tenantId, firstName, lastName, email, phone, emergencyContact, emergencyPhone,
       propertyId, unit, leaseStart, leaseEnd, rent, deposit, notes, avatar]
    );
    
    res.status(201).json({ id: tenantId, message: 'Tenant created successfully' });
  } catch (error) {
    console.error('Create tenant error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Payments routes
app.get('/api/payments', authenticateToken, async (req, res) => {
  try {
    const [payments] = await db.execute(`
      SELECT p.*, t.first_name, t.last_name, pr.name as property_name
      FROM payments p
      JOIN tenants t ON p.tenant_id = t.id
      JOIN properties pr ON p.property_id = pr.id
      ORDER BY p.due_date DESC
    `);
    res.json(payments);
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});