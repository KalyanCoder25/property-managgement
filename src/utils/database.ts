// Database connection utility for MySQL
import mysql from 'mysql2/promise';

interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
}

export class DatabaseManager {
  private static instance: DatabaseManager;
  private connection: mysql.Connection | null = null;

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async connect(config: DatabaseConfig): Promise<void> {
    try {
      this.connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port || 3306,
      });
      console.log('Connected to MySQL database');
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
      console.log('Disconnected from MySQL database');
    }
  }

  async query(sql: string, params?: any[]): Promise<any> {
    if (!this.connection) {
      throw new Error('Database not connected');
    }
    
    try {
      const [results] = await this.connection.execute(sql, params);
      return results;
    } catch (error) {
      console.error('Query failed:', error);
      throw error;
    }
  }

  async createTables(): Promise<void> {
    const tables = [
      `CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role ENUM('admin', 'manager', 'owner') DEFAULT 'manager',
        avatar VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS properties (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(50) NOT NULL,
        zip_code VARCHAR(20) NOT NULL,
        type ENUM('apartment', 'house', 'townhouse', 'condo', 'loft') NOT NULL,
        bedrooms INT NOT NULL,
        bathrooms DECIMAL(3,1) NOT NULL,
        sqft INT NOT NULL,
        rent DECIMAL(10,2) NOT NULL,
        deposit DECIMAL(10,2) NOT NULL,
        status ENUM('available', 'occupied', 'maintenance') DEFAULT 'available',
        description TEXT,
        amenities JSON,
        images JSON,
        tenant_id VARCHAR(36),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_type (type),
        INDEX idx_city (city)
      )`,
      
      `CREATE TABLE IF NOT EXISTS tenants (
        id VARCHAR(36) PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        emergency_contact VARCHAR(200),
        emergency_phone VARCHAR(20),
        property_id VARCHAR(36),
        unit VARCHAR(20),
        lease_start DATE,
        lease_end DATE,
        rent DECIMAL(10,2),
        deposit DECIMAL(10,2),
        status ENUM('active', 'pending', 'expired') DEFAULT 'pending',
        notes TEXT,
        avatar VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_property (property_id),
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL
      )`,
      
      `CREATE TABLE IF NOT EXISTS payments (
        id VARCHAR(36) PRIMARY KEY,
        tenant_id VARCHAR(36) NOT NULL,
        property_id VARCHAR(36) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        due_date DATE NOT NULL,
        paid_date DATE,
        status ENUM('paid', 'pending', 'overdue') DEFAULT 'pending',
        method VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_due_date (due_date),
        INDEX idx_tenant (tenant_id),
        INDEX idx_property (property_id),
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )`,
      
      `CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(36) PRIMARY KEY,
        sender_id VARCHAR(36) NOT NULL,
        recipient_id VARCHAR(36) NOT NULL,
        content TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        read_status BOOLEAN DEFAULT FALSE,
        type ENUM('sent', 'received') NOT NULL,
        INDEX idx_sender (sender_id),
        INDEX idx_recipient (recipient_id),
        INDEX idx_timestamp (timestamp),
        FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE
      )`
    ];

    for (const table of tables) {
      await this.query(table);
    }
    
    console.log('Database tables created successfully');
  }
}