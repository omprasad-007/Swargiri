# Swargiri - The Digital Kirtan and Bhajan Platform

Swargiri is a professional full-stack web platform for devotional music, kirtans, bhajans, and spiritual learning. It combines streaming, education, creator tools, community features, and mental wellness to build a premium digital ecosystem that celebrates Indian culture and supports inner peace.

## Vision
Build a production-level spiritual music platform that merges:
- Music streaming
- Devotional learning
- Creator growth
- Community interaction
- AI-powered personalization

## Key Features
- Streaming-first library for audio and video bhajans and kirtans
- YouTube-style video discovery for pravachans and temple events
- Udemy-style learning system for devotional music and instruments
- Creator dashboard for uploads, analytics, and audience growth
- Stress relief mode with breathing guides and meditation playlists
- PWA support with offline caching and installable experience
- AI recommendations, smart playlists, and mood-based discovery

## Platform Modules
- Devotional Library: audio and video streaming with lyrics, playlists, and filters
- Academy: courses for kirtan training, harmonium, tabla, mridang, kartal, and music theory
- Creator Hub: upload management, lyrics tools, and engagement analytics
- Live Events: streaming kirtans, temple broadcasts, and live chat
- Community: comments, follows, sharing, and requests
- Calm Mode: meditation tracks, breathing guides, and wellness playlists

## Technology Stack
Frontend:
- Next.js (React)
- Tailwind CSS
- Framer Motion
- Shadcn UI
- Lottie animations

Backend:
- Node.js
- Express.js

Database:
- Firebase Firestore

Authentication:
- Firebase Authentication
- Google Login
- Email Login
- Role-based access

Storage:
- Cloudinary or Firebase Storage for audio, video, course media, and thumbnails

Deployment:
- Frontend on Vercel
- Backend on Render or Railway
- Firebase Firestore for managed database

## System Architecture
Multi-layer design:
- Frontend Layer: UI, player, course pages, dashboards, animations
- Backend Layer: APIs, auth validation, media uploads, analytics
- Database Layer: Firestore collections for users, songs, playlists, courses, lessons, events, comments, analytics
- Auth Layer: Firebase login, session management, role checks
- Media Storage Layer: audio, video, and image storage
- AI Layer: recommendations, mood suggestions, voice search, smart playlists

## Local Storage Support
Local storage improves performance and offline experience:
- User preferences
- Recently played songs
- Favorite songs cache
- Music player state
- Theme preference
- Language preference

Example use cases:
- Remember last played bhajan
- Store player position
- Cache frequently played songs
- Persist offline playlists

## Firestore Collections
- Users
- Songs
- Playlists
- Courses
- Lessons
- Comments
- Events
- Analytics

Song document fields:
- title
- god
- language
- singer
- lyrics
- audioURL
- videoURL
- raga
- taal
- views
- likes
- uploadDate
- uploadedBy

## Project Structure
- frontend
- frontend/src
- frontend/src/app
- frontend/src/components
- frontend/src/hooks
- frontend/src/lib
- frontend/src/utils
- frontend/public
- backend
- backend/controllers
- backend/routes
- backend/models
- backend/middleware
- backend/config
- docs

## Setup Instructions
Backend:
- cd backend
- npm install
- Create backend/.env with your Firebase credentials
- npm start

Frontend:
- cd frontend
- npm install
- npm run dev

## Environment Variables
Frontend:
- NEXT_PUBLIC_YOUTUBE_API_KEY

Backend:
- PORT
- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_PRIVATE_KEY
- FIREBASE_STORAGE_BUCKET
- AUTH_REQUIRED
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

AUTH_REQUIRED:
- Set to false to bypass auth checks during local development

## Deployment Notes
- Configure environment variables in Vercel and Render or Railway
- Ensure Firebase service account credentials are available in the backend environment
- Use Firebase Authentication for role-based access

## Documentation
See the docs folder for:
- Architecture overview
- API outline
- Setup guide

## Final Goal
Swargiri demonstrates modern full-stack engineering with a spiritual music focus. It is designed to be scalable, mobile-friendly, and portfolio-ready for professional recruiters.
