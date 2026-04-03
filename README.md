# LabProject

A full-stack library management system with Django backend and React frontend.

## Setup

### Backend (Django)

1. Navigate to the `backend` directory.
2. Create a virtual environment: `python -m venv venv`
3. Activate it: `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt` (create if not exists)
5. Run migrations: `python manage.py migrate`
6. Start server: `python manage.py runserver`

### Frontend (React)

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Deployment

- Backend: Deploy Django app to Heroku, AWS, etc.
- Frontend: Build with `npm run build` and deploy to Netlify, Vercel, etc.

## Database

The project uses SQLite. After cloning, run migrations to set up the database.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request