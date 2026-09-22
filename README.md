# Finance Tracker and Budgeting Tool

A full-stack budgeting application built with Django REST Framework on the backend and React + Vite on the frontend. The app supports user registration, JWT-based authentication, and per-user account and transaction management.

README last updated: 22/09/2026

## Overview

This project is still under development and should be treated as an incomplete prototype rather than a production-ready application. The current implementation includes:

- User registration and login flow
- JWT authentication with access and refresh tokens
- Protected frontend routes
- Basic create/list/delete support for user-owned accounts
- Basic create/list/delete support for user-owned transactions
- PostgreSQL-ready backend configuration

## Demo

[Watch the demo video](https://drive.google.com/file/d/1kDdMioUCKATw6uTjIBf0hVfyJGmL2HUw/view?usp=sharing)

## Tech Stack

### Backend

- Python
- Django 6.1
- Django REST Framework
- djangorestframework-simplejwt
- PostgreSQL support via Django database settings
- CORS enabled for local frontend development

### Frontend

- React 19
- Vite
- React Router
- Axios for API requests

## Project Structure

```text
Budgeting/
├── backend/
│   ├──  transactions/
│   ├── budgeting/
│   ├── transactions/
│   ├── users/
│   ├── manage.py
│   ├── requirements.txt
│   └── sqlite_data.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── README.md
└── .venv/
```

## Features Implemented

- NEW Account details page including related transactions
- NEW Transaction details page
- User account creation
- Login and token retrieval
- Secure access to authenticated endpoints
- Account listing and creation
- Account deletion restricted to the logged-in user
- Transaction listing and creation
- Transaction deletion restricted to the logged-in user
- Frontend routing between login, register, home, and protected pages

## Planned / Incomplete Areas

This project is not yet complete. Some areas that may still need work include:

- Budget calculations and summaries
- Better validation and error handling
- UI polish and additional features
- Production security hardening
- Automated tests and CI/CD
- Deployment configuration

## Backend Setup

### 1. Create and activate a virtual environment

```bash
cd backend
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
# Linux/macOS
source .venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

The Django project is configured to use PostgreSQL through environment variables. Create a `.env` file inside the `backend/` folder or export these values in your shell:

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=127.0.0.1
DB_PORT=5432
```

### 4. Apply database migrations

```bash
python manage.py migrate
```

### 5. Run the backend

```bash
python manage.py runserver
```

The API will be available at:

```text
http://127.0.0.1:8000
```

## Frontend Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure the API URL

Create a `.env.local` file in the `frontend/` directory:

```env
VITE_API_URL=http://127.0.0.1:8000
```

### 3. Run the frontend

```bash
npm run dev
```

The frontend will typically run at:

```text
http://127.0.0.1:5173
```

## Authentication and API Routes

The backend exposes the following core routes:

### Auth

- `POST /api/user/register/` - Register a new user
- `POST /api/token/` - Login and receive JWT tokens
- `POST /api/token/refresh/` - Refresh an access token

### Accounts

- `GET /api/accounts/` - List current user's accounts
- `POST /api/accounts/` - Create a new account
- `DELETE /api/accounts/delete/<id>/` - Delete a user's account

### Transactions

- `GET /api/transactions/` - List current user's transactions
- `POST /api/transactions/` - Create a transaction
- `DELETE /api/transactions/delete/<id>/` - Delete a transaction

Note: there is currently no `PUT` or `PATCH` endpoint for transaction updates.

All account and transaction endpoints require authentication.

## Notes for Development

- The project currently uses a permissive Django configuration (`DEBUG = True`, `ALLOWED_HOSTS = ["*"]`) intended only for local development.
- The secret key is hardcoded in the Django settings and should not be used in production.
- CORS is enabled for local development, which allows the frontend to talk to the backend during development.
- The app is structured around per-user data isolation, so each user sees only their own accounts and transactions.

## License

This project does not currently include a license file. Check with the repository owner before using it commercially or distributing it publicly.

## Contributing

This repository appears to be a personal or learning project. Contributions are possible if the project owner approves them, but the app is still actively evolving and may change.
