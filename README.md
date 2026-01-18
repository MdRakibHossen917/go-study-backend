# Go Study Backend

Backend API for Go Study application built with Node.js, Express, and MongoDB.

## Features

- User Registration & Login with JWT authentication
- Profile creation and update (SSC, HSC, BSc, MSc, Projects)
- Profile completion percentage calculation
- JWT protected routes
- MongoDB database with Mongoose ODM

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- dotenv (environment variables)
- cors (cross-origin resource sharing)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=https://go-study-henna.vercel.app
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`
  
- `GET /api/auth/me` - Get current user (Protected)

### Profile

- `GET /api/profile` - Get user profile (Protected)
- `POST /api/profile` - Create or update profile (Protected)
- `PUT /api/profile` - Create or update profile (Protected)

### Health Check

- `GET /api/health` - Server health check

## Profile Structure

```json
{
  "ssc": {
    "institution": "string",
    "passingYear": "string",
    "grade": "string",
    "board": "string"
  },
  "hsc": {
    "institution": "string",
    "passingYear": "string",
    "grade": "string",
    "board": "string"
  },
  "bsc": {
    "institution": "string",
    "passingYear": "string",
    "grade": "string",
    "board": "string"
  },
  "msc": {
    "institution": "string",
    "passingYear": "string",
    "grade": "string",
    "board": "string"
  },
  "projects": [
    {
      "title": "string",
      "description": "string",
      "technologies": "string",
      "link": "string"
    }
  ]
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend application URL

## License

ISC

