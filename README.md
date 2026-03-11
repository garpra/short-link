# Short Link

A simple URL shortener website built with Express and SQLite.

## Tech Stack

- **Frontend:** Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** SQLite

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/garpra/short-link.git
   ```
2. Navigate to the project directory:
   ```bash
   cd short-link
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the server, run the following command:

```bash
npm start
```

The application will be running at `http://localhost:3000`.

## Database Schema

The database schema is defined in the `schema.sql` file and consists of two tables:

- **`users`**: Stores user information (id, name, email, password, created_at).
- **`urls`**: Stores URL information (id, user_id, short_code, original_url, click_count, created_at, expires_at).
