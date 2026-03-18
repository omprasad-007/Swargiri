# API Outline

Base URL: /api

## Auth
- POST /auth/login
- POST /auth/logout
- GET /auth/me

## Songs
- GET /songs
- POST /songs
- GET /songs/:id
- PATCH /songs/:id
- DELETE /songs/:id

## Playlists
- GET /playlists
- POST /playlists
- GET /playlists/:id
- PATCH /playlists/:id
- DELETE /playlists/:id

## Courses
- GET /courses
- POST /courses
- GET /courses/:id
- PATCH /courses/:id
- DELETE /courses/:id

## Lessons
- GET /lessons
- POST /lessons
- GET /lessons/:id
- PATCH /lessons/:id
- DELETE /lessons/:id

## Events
- GET /events
- POST /events
- GET /events/:id
- PATCH /events/:id
- DELETE /events/:id

## Comments
- GET /comments
- POST /comments
- GET /comments/:id
- DELETE /comments/:id

## Analytics
- GET /analytics/overview
- POST /analytics/event
