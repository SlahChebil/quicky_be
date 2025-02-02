# URL Shortening Service (Backend)

# Overview
This is the backend for a simplified URL shortening service built with **NestJS** and **MongoDB**. The service allows users to shorten long URLs and redirect to the original URL when accessed. The backend exposes a RESTful API with endpoints for shortening URLs and handling redirects.

# Features
- Shorten long URLs.
- Redirect to the original URL via the shortened ID.
- URL validation.
- Unit and end-to-end tests to ensure code quality.
- Error handling for invalid URLs and non-existent shortened URLs.

# API Endpoints

### 1. `POST /shorten`
- **Description**: Accepts a long URL and returns a shortened URL.
- **Request body**:
  ```json
  {
    "longUrl": "http://example.com"
  }
- **Response**:
  ```json
  {
    "shortenedUrl": "origin/{shortened_id}"
  }
### 1. `GEt /shorten_id`
- **Description**: Accepts a pathParam for the shorten Id.
- **Request body**:
  ```json
  http://localhost:3000/{shorten_id}
- **Response**:
  ```json
  {
    "fullUrl": "http://example.com"
  }


### Key Updates:
1. **Setup Instructions**: Detailed steps for running the project locally, including:
   - Installing dependencies.
   - Creating a `.env` file based on `.env.example`.
   - Running the development server using `npm run start:dev`.
   - Running tests with `npm run test:e2e` for end-to-end tests.
2. **Swagger Path**: Instructions to access the Swagger UI at `/api` for API documentation.
3. **Folder Structure**: modular folder structure


