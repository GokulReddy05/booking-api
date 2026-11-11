# Booking & Resource Availability API

A RESTful backend API for managing rooms, bookings, resource availability, and booking lifecycle operations. Built with Node.js, Express, PostgreSQL, and Prisma.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Database Hosting:** Supabase
- **Language:** JavaScript (ES Modules)

## Features

### Room Management
- Create rooms
- Retrieve all rooms
- Retrieve a room by ID
- Update room details
- Deactivate and reactivate rooms

### Booking Management
- Create bookings
- Retrieve all bookings
- Retrieve booking details
- Cancel bookings
- Reschedule bookings
- Check room availability

### Booking Validations
- Prevent overlapping bookings
- Validate booking date and time
- Enforce minimum booking duration
- Enforce maximum booking duration
- Enforce minimum booking notice
- Enforce advance booking limits
- Validate booking lifecycle transitions

### Concurrency Handling
- PostgreSQL transactions
- Room-level row locking
- Availability checks within transactions

## Architecture

The project follows a layered architecture:

```text
Client
  |
  v
Routes
  |
  v
Controllers
  |
  v
Services
  |
  v
Prisma ORM
  |
  v
PostgreSQL
```

- **Routes:** Define API endpoints.
- **Controllers:** Handle HTTP requests and responses.
- **Services:** Contain business logic and validations.
- **Prisma:** Handles database operations.
- **PostgreSQL:** Stores application data.

## Project Structure

```text
booking-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── utils/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd booking-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
DATABASE_URL="your_postgresql_connection_string"
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

## API Endpoints

### Rooms

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/rooms` | Create a room |
| GET | `/api/rooms` | Get all rooms |
| GET | `/api/rooms/:id` | Get room by ID |
| PATCH | `/api/rooms/:id` | Update room |
| PATCH | `/api/rooms/:id/deactivate` | Deactivate room |
| PATCH | `/api/rooms/:id/activate` | Reactivate room |

### Bookings

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings` | Get all bookings |
| GET | `/api/bookings/:id` | Get booking by ID |
| PATCH | `/api/bookings/:id` | Reschedule booking |
| PATCH | `/api/bookings/:id/cancel` | Cancel booking |

### Availability

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/rooms/:id/availability` | Check room availability |

Query parameters:

```text
startTime
endTime
```

## Booking Rules

- Only active rooms can receive new bookings.
- Booking start time must be before booking end time.
- Bookings must be in the future.
- Minimum booking duration: 30 minutes.
- Maximum booking duration: 8 hours.
- Minimum booking notice: 30 minutes.
- Maximum advance booking window: 90 days.
- Overlapping confirmed bookings are not allowed.
- Cancelled bookings do not block availability.
- Only confirmed bookings can be cancelled or rescheduled.

## Booking Lifecycle

```text
Confirmed
   |
   ├── Reschedule
   |
   └── Cancel
          |
          v
      Cancelled
```

## Future Improvements

- PostgreSQL exclusion constraints for booking conflicts
- Authentication and authorization
- Booking buffer periods
- Recurring bookings
- Automated integration tests
- API documentation with Swagger
- Centralized error handling improvements

## License

This project is intended for learning and portfolio development.
