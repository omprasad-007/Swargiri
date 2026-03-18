# Setup Guide

## Prerequisites
- Node.js 18+
- Firebase project for Authentication and Firestore
- Cloudinary account (optional, if not using Firebase Storage)

## Backend Setup
- cd backend
- npm install
- Create backend/.env with Firebase and Cloudinary values
- npm start

## Frontend Setup
- cd frontend
- npm install
- npm run dev

## Local Development Tips
- Use a valid YouTube API key for live search results
- Use Firebase Emulator for local auth testing if needed
- Store secrets in .env files only
- Set AUTH_REQUIRED=false to bypass auth checks during local development
