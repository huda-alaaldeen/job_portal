# Job Portal

A full-stack job portal web application that allows users to browse job opportunities, view job details, and apply for jobs.

## Technologies Used

### Backend

* Laravel
* PHP
* MySQL
* Laravel Sanctum

### Frontend

* React
* JavaScript
* CSS

## Features

* User registration and login
* Authentication using Laravel Sanctum
* Browse available jobs
* Search and filter jobs
* View job details
* Post job opportunities
* Apply for jobs
* User profile management

## Project Structure

* `backend/` — Laravel API
* `frontend/` — React application

## Installation

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Database

This project uses MySQL.

Create a database and update the database settings in the `.env` file.

## Author

Huda Ala'eddin
