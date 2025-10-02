# Fullstack Task Management Application

This project is a fullstack application consisting of a backend API service and a frontend UI for task management. It includes user authentication, CRUD operations for tasks, and an admin panel for managing users and news.

## Features

- User authentication (register, login, logout)
- Task management (create, read, update, delete tasks)
- Admin panel for managing users and news
- Responsive frontend UI built with React
- Backend API built with Node.js and Express
- SQLite database for data persistence
- Docker support for easy deployment

## Project Structure

```
.
├── backend/          # Backend API service
│   ├── src/
│   │   ├── models/   # Database models
│   │   ├── routes/   # API routes
│   │   ├── middleware/ # Authentication and error handling
│   │   └── config/   # Database configuration
│   ├── server.js     # Main server file
│   ├── package.json
│   └── Dockerfile
├── frontend/         # Frontend React application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # React context for authentication
│   │   └── api.js      # API client
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml # Docker Compose configuration
└── README.md
```

## Backend

### Technologies Used
- Node.js
- Express.js
- SQLite
- bcryptjs for password hashing
- jsonwebtoken for authentication
- express-validator for input validation

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

#### Tasks
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

#### Admin (requires admin role)
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user role
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/news` - Get all news
- `POST /api/admin/news` - Create news
- `PUT /api/admin/news/:id` - Update news
- `DELETE /api/admin/news/:id` - Delete news

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:3000`.

## Frontend

### Technologies Used
- React
- React Router for routing
- Axios for API calls
- Bootstrap for styling
- React Context for state management

### Features
- User registration and login
- Dashboard with task management
- Admin panel for user and news management
- Responsive design

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`.

## Docker Deployment

The project includes Docker support for easy deployment.

### Building and Running with Docker Compose

1. Build the images:
   ```bash
   docker-compose build
   ```

2. Start the services:
   ```bash
   docker-compose up
   ```

The application will be available at:
- Frontend: `http://localhost:80`
- Backend API: `http://localhost:3000`

### Pushing Images to Docker Hub

The images are configured to be pushed to Docker Hub under the username `atharv2905`:

- Backend: `atharv2905/backend:latest`
- Frontend: `atharv2905/frontend:latest`

To push the images:

```bash
docker login
docker push atharv2905/backend:latest
docker push atharv2905/frontend:latest
```

## API Documentation

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "atharv2433",
  "email": "atharv2433@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "atharv2433@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "atharv2433",
    "email": "atharv2433@example.com",
    "role": "user"
  }
}
```

### Tasks

#### Get Tasks
```http
GET /api/tasks
Authorization: Bearer jwt_token
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the fullstack application",
  "status": "pending"
}
```

## Testing

The frontend includes unit tests using Jest and React Testing Library.

To run tests:
```bash
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
