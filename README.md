# Marvel Movies Project

## Project Overview
The Marvel Movie Data Explorer is a full-stack application designed to analyze and present data related to Marvel movies, actors, and characters using data from the TMDB (The Movie Database) API. 

This MVP answers specific questions such as:

- Which Marvel movies has each actor appeared in?
- Which actors have played multiple Marvel characters?
- Which Marvel characters have been portrayed by multiple actors?

The application consists of a Node.js backend, a Vite-React-TS frontend, and a MongoDB database, all orchestrated using Docker Compose.

---

## Features
### Backend
- **Movies Per Actor Endpoint**: Returns a list of Marvel movies each actor has appeared in.
- **Actors with Multiple Characters Endpoint**: Lists actors who played more than one Marvel character.
- **Characters with Multiple Actors Endpoint**: Identifies characters portrayed by multiple actors.

### Frontend
- A visually appealing home page showcasing a grid of all Marvel movies.
- User-friendly interface to:
  - View movies associated with specific actors.
  - List actors who have played multiple Marvel characters and their respective roles.
  - Display Marvel characters portrayed by multiple actors along with corresponding movies.
- **State Management**: Context API is used for efficient state management across components.

---

## Technology Stack
### Backend:
- **Node.js** with **TypeScript**
- **Express.js** for REST API development
- **MongoDB** for data storage

### Frontend:
- **Vite** with **React** and **TypeScript**
- **Axios** for API communication
- **Material-UI** for component styling

### Deployment:
- **Docker Compose** for container orchestration
- **TMDB API** for fetching Marvel movie data

---

## Setup Instructions
### Prerequisites
Ensure you have the following installed on your machine:
- Docker
- Docker Compose

### Step-by-Step Guide
1. **Clone the Repository**:
   ```
   git clone this repo
   cd marvel-movies
   ```

3. **Run the Application**:
   - Start the containers using Docker Compose:
     docker-compose up --build

4. **Access the Application**:
   - Frontend: Open your browser and navigate to `http://localhost:8080`

5. **Stop the Application**:
   - To stop the containers:
     docker-compose down

---

### Base backend URL
```
http://localhost:3000
```

2. **API Optimization**:
   - Cached TMDB responses to reduce redundant API calls.
   - Implemented retry logic for handling rate limits and errors.

3. **Extensibility**:
   - Backend structured to easily add new endpoints.
   - Frontend components modular and reusable for additional features.

4. **Performance Considerations**:
   - Optimized database queries to ensure quick response times.
   - Dockerized application for consistent and scalable deployment.

