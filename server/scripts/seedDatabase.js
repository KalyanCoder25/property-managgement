const mysql = require('mysql2/promise');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'property_management',
  port: process.env.DB_PORT || 3306
};

// Property images from Pexels
const propertyImages = [
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396125/pexels-photo-1396125.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  // Add more property images...
];

// Tenant avatars from Pexels
const tenantAvatars = [
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=200',
  // Add more tenant avatars...
];

async function seedDatabase() {
  let db;
  
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to database for seeding...');
    
    // Clear existing data
    await db.execute('SET FOREIGN_KEY_CHECKS = 0');
    await db.execute('TRUNCATE TABLE payments');
    await db.execute('TRUNCATE TABLE messages');
    await db.execute('TRUNCATE TABLE tenants');
    await db.execute('TRUNCATE TABLE properties');
    await db.execute('TRUNCATE TABLE users');
    await db.execute('SET FOREIGN_KEY_CHECKS = 1');
    
    console.log('Cleared existing data...');
    
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await db.execute(
      'INSERT INTO users (id, email, password_hash, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, ?)',
      [uuidv4(), 'admin@propmanager.com', adminPassword, 'Admin', 'User', 'admin']
    );
    
    console.log('Created admin user...');
    
    // Generate 500 properties
    console.log('Generating 500 properties...');
    const propertyTypes = ['apartment', 'house', 'townhouse', 'condo', 'loft'];
    const statuses = ['available', 'occupied', 'maintenance'];
    const amenities = ['Parking', 'Laundry', 'Air Conditioning', 'Heating', 'Dishwasher', 'Balcony', 'Gym Access', 'Pool Access'];
    
    for (let i = 0; i < 500; i++) {
      const propertyId = uuidv4();
      const bedrooms = faker.number.int({ min: 1, max: 5 });
      const bathrooms = faker.number.float({ min: 1, max: 4, fractionDigits: 1 });
      const sqft = faker.number.int({ min: 500, max: 3000 });
      const rent = faker.number.int({ min: 800, max: 5000 });
      
      await db.execute(
        `INSERT INTO properties (id, name, address, city, state, zip_code, type, bedrooms, bathrooms, sqft, rent, deposit, status, description, amenities, images) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          propertyId,
          `${faker.location.streetAddress()} ${faker.helpers.arrayElement(['Apt', 'Unit', 'Suite'])} ${faker.number.int({ min: 1, max: 50 })}${faker.helpers.arrayElement(['A', 'B', 'C', ''])}`,
          faker.location.streetAddress(),
          faker.location.city(),
          faker.location.state({ abbreviated: true }),
          faker.location.zipCode(),
          faker.helpers.arrayElement(propertyTypes),
          bedrooms,
          bathrooms,
          sqft,
          rent,
          rent,
          faker.helpers.arrayElement(statuses),
          faker.lorem.paragraph(),
          JSON.stringify(faker.helpers.arrayElements(amenities, { min: 2, max: 6 })),
          JSON.stringify([
            propertyImages[i % propertyImages.length],
            propertyImages[(i + 1) % propertyImages.length],
            propertyImages[(i + 2) % propertyImages.length]
          ])
        ]
      );
      
      if (i % 50 === 0) {
        console.log(`Generated ${i + 1} properties...`);
      }
    }
    
    // Generate 150 tenants
    console.log('Generating 150 tenants...');
    const tenantStatuses = ['active', 'pending', 'expired'];
    
    for (let i = 0; i < 150; i++) {
      const tenantId = uuidv4();
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const leaseStart = faker.date.past();
      const leaseEnd = new Date(leaseStart);
      leaseEnd.setFullYear(leaseEnd.getFullYear() + 1);
      
      await db.execute(
        `INSERT INTO tenants (id, first_name, last_name, email, phone, emergency_contact, emergency_phone, unit, lease_start, lease_end, rent, deposit, status, notes, avatar)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          tenantId,
          firstName,
          lastName,
          faker.internet.email({ firstName, lastName }),
          faker.phone.number(),
          faker.person.fullName(),
          faker.phone.number(),
          `${faker.number.int({ min: 1, max: 50 })}${faker.helpers.arrayElement(['A', 'B', 'C', ''])}`,
          leaseStart.toISOString().split('T')[0],
          leaseEnd.toISOString().split('T')[0],
          faker.number.int({ min: 800, max: 5000 }),
          faker.number.int({ min: 800, max: 5000 }),
          faker.helpers.arrayElement(tenantStatuses),
          faker.lorem.sentence(),
          tenantAvatars[i % tenantAvatars.length]
        ]
      );
      
      if (i % 25 === 0) {
        console.log(`Generated ${i + 1} tenants...`);
      }
    }
    
    console.log('Database seeded successfully!');
    console.log('Admin login: admin@propmanager.com / admin123');
    
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    if (db) {
      await db.end();
    }
  }
}

seedDatabase();