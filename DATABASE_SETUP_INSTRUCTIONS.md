# Property Management System - Database Setup Instructions

## Prerequisites
- MySQL Server 8.0 or higher
- MySQL Workbench (recommended)
- Node.js 16+ and npm

## Step 1: Database Setup with MySQL Workbench

1. **Open MySQL Workbench**
   - Launch MySQL Workbench
   - Connect to your MySQL server instance

2. **Create Database**
   - Open the `database-setup.sql` file in MySQL Workbench
   - Execute the entire script to create the database and tables
   - This will create the `property_management` database with all required tables

3. **Verify Database Creation**
   ```sql
   USE property_management;
   SHOW TABLES;
   ```
   You should see: users, properties, tenants, payments, messages

## Step 2: Backend Server Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=property_management
   DB_PORT=3306
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=3001
   ```

4. **Seed the Database with Sample Data**
   ```bash
   npm run seed
   ```
   This will generate:
   - 500 unique properties with different images
   - 150 tenants with unique profile pictures
   - Sample payments and relationships

5. **Start the Backend Server**
   ```bash
   npm run dev
   ```
   Server will run on http://localhost:3001

## Step 3: Frontend Setup

1. **Return to main directory**
   ```bash
   cd ..
   ```

2. **Start the Frontend**
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## Step 4: Login Credentials

**Admin Account:**
- Email: `admin@propmanager.com`
- Password: `admin123`

## Features Included

✅ **Authentication System**
- Sign in/Sign up forms with validation
- JWT token-based authentication
- Role-based access (admin, manager, owner)

✅ **500+ Properties**
- Unique property images from Pexels
- Realistic property data (addresses, prices, amenities)
- Different property types (apartment, house, townhouse, condo, loft)

✅ **150+ Tenants**
- Unique profile pictures from Pexels
- Complete tenant information (contact, lease details)
- Emergency contacts and notes

✅ **Database Integration**
- MySQL database with proper relationships
- Foreign key constraints
- Indexed columns for performance

✅ **API Endpoints**
- RESTful API for all CRUD operations
- Authentication middleware
- Error handling

## Database Schema

### Users Table
- User authentication and profile information
- Role-based access control

### Properties Table
- Complete property information
- JSON fields for amenities and images
- Status tracking (available, occupied, maintenance)

### Tenants Table
- Tenant personal and contact information
- Lease details and status
- Emergency contacts

### Payments Table
- Payment tracking with due dates
- Payment status and methods
- Links to tenants and properties

### Messages Table
- Communication system between users
- Read status tracking

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create new property

### Tenants
- `GET /api/tenants` - Get all tenants
- `POST /api/tenants` - Create new tenant

### Payments
- `GET /api/payments` - Get all payments with tenant/property details

## Troubleshooting

1. **Database Connection Issues**
   - Verify MySQL server is running
   - Check credentials in `.env` file
   - Ensure database exists

2. **Seeding Fails**
   - Check database permissions
   - Verify all tables are created
   - Check for foreign key constraint errors

3. **Frontend Authentication Issues**
   - Ensure backend server is running on port 3001
   - Check browser console for API errors
   - Verify JWT secret is set

## Production Deployment

1. **Database**
   - Use environment variables for all credentials
   - Enable SSL connections
   - Set up regular backups

2. **Backend**
   - Use PM2 or similar process manager
   - Set up reverse proxy with Nginx
   - Enable HTTPS

3. **Frontend**
   - Build for production: `npm run build`
   - Deploy to CDN or static hosting
   - Update API endpoints for production

## Security Considerations

- All passwords are hashed with bcrypt
- JWT tokens expire after 24 hours
- SQL injection protection with parameterized queries
- CORS configured for frontend domain
- Input validation on all endpoints