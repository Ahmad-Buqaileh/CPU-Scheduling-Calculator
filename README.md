# CPU Scheduling Calculator

This project is a full-stack CPU Scheduling Calculator with a React frontend and a Spring Boot backend.

## Getting Started

Follow the steps below to run the project locally.

### Prerequisites

- Java 21
- Node.js (v16+ recommended)
- npm 
- Git

### 1. Clone the Repository

```
git clone https://github.com/Ahmad-Buqaileh/CPU-Scheduling-Calculator.git
cd CPU-Scheduling-Calculator
```

### 2. Run the Backend
#### The backend will start on http://localhost:8080.
```
cd backend
./mvnw spring-boot:run
```

### 3. Configure the Frontend
#### Navigate to the frontend directory and create a .env file:
```
cd ../frontend
touch .env
```
#### Inside .env, add:
```
VITE_API_URL=http://localhost:8080
```
#### to ensure that the frontend connects to your local backend

### 4. Run the Frontend
#### Install dependencies and start the development server:
```
npm install
npm run dev
```
## Frontend: https://cpu-scheduling-calculator.vercel.app
