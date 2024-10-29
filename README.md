# User Management Dashboard Application

## Overview

This is a simple user management dashboard that allows users to log in and manage other users based on their roles. Admin users can see the total number of users, add new users, edit, or delete existing users. Regular users only have access to a welcome message.

## Features

- **User Role Management**: Admin users can manage other users, while regular users have limited access.
- **Authentication**: Basic login functionality to authenticate users.
- **Admin Dashboard**: Admins can add, edit, and delete users.
- **RESTful API**: Backend API for user management.
- **Unit Tests**: Includes unit tests for testing user creation.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS for styling.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB with Mongoose for data modeling.
- **Testing**: Jest and Supertest for backend unit testing.
- **Authentication**: JWT for token-based authentication.

## Setup and Installation
### Quick Setup

To quickly set up both backend and frontend environments, you can run the following script:

```bash
chmod +x setup.sh
./setup.sh
```


### Prerequisites

- Node.js and npm installed
- MongoDB installed and running or MongoDB Atlas account

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/TheClaireLiu/user-dashboard1.git
   cd user-dashboard
   ```

2. **Install dependencies for frontend and backend**:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Running the Application**:

    - **Backend**:

      ```bash
      cd backend
      npm start
      ```

      The backend server will start at `http://localhost:5000`.

    - **Frontend**:

      ```bash
      cd ../frontend
      npm start
      ```

      The frontend application will start at `http://localhost:3000`.

4. **Running Tests**:

    - **Backend Unit Tests**:

      ```bash
      cd backend
      npm test
      ```

## Design Choices

### Frontend

- **React**: React was chosen for its component-based architecture, allowing reusable UI components for Login and Dashboard.
- **Tailwind CSS**: Tailwind was used to provide a simple yet customizable way to style components without writing custom CSS.

### Backend

- **Express.js**: Express was selected for its minimal and flexible Node.js framework, suitable for creating RESTful APIs.
- **MongoDB and Mongoose**: MongoDB was chosen for its ease of use and flexibility with schema-less data, and Mongoose was used for schema management.
- **JWT Authentication**: JSON Web Tokens were used for authentication, allowing for secure communication between the frontend and backend.

### Testing

- **Jest and Supertest**: These tools were used for testing the backend endpoints to ensure reliable user management features.

## Usage of AI Tools

I used OpenAI's ChatGPT as a tool to assist in generating parts of the code and documentation. Specifically, I used the following prompts:

- **"Create a Simple User Dashboard with Role Management"**: To generate the initial structure for the user dashboard.
- **"Add unit tests for user creation endpoint"**: To create unit tests using Jest and Supertest.
- **"Explain how to resolve Mongoose connection warnings"**: To help troubleshoot deprecation warnings.

After generating code using ChatGPT, I made several modifications, including:

- Adding JWT authentication logic.
- Modifying API routes and responses to match the application requirements.
- Adjusting frontend components to handle different user roles.
- Writing additional validation logic and enhancing error handling in the backend.

The AI-generated content served as a foundation, and I refined and adapted it to meet the project requirements.

