# Architecture Overview

Swargiri follows a layered architecture to keep the platform scalable and easy to evolve.

## Layers
- Frontend Layer: Next.js app for UI, player, learning pages, dashboards, and animations
- Backend Layer: Express API for data access, uploads, analytics, and integrations
- Database Layer: Firebase Firestore for persistent storage
- Authentication Layer: Firebase Authentication for Google and Email login
- Media Storage Layer: Cloudinary or Firebase Storage for audio, video, and images
- AI Layer: Recommendations, mood detection, voice search, and smart playlists

## Data Flow
- Client requests hit the API Gateway (Express)
- Auth middleware verifies Firebase tokens and roles
- Controllers handle business logic and persistence
- Firestore stores metadata and user activity
- Storage services deliver media assets

## Roles
- Admin: platform moderation and analytics
- Kirtankar: content upload and engagement tools
- Student: learning tools and progress tracking
- User: listening, playlists, and community participation

## Performance
- Local storage cache for player state and user preferences
- Offline-first PWA support for critical routes
- Lazy loading for media-heavy sections
