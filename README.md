

## Description

🎵 Music API

A NestJS-based REST API for managing, streaming, and tracking music tracks. Features include:


## Features

### 1. Track Management
- Upload music tracks with metadata (genre, artist, title)
- Display trending tracks based on play count
- Search tracks by title or artist
- Stream tracks with byte-range support for smooth playback

### 2. User Management
- Secure login and token management using JWT-based signup and login
- Users can manage and update their profiles
- Users can create an artist account to upload their own tracks

### 3. Playlist Management
- Users can create and delete playlists
- Add tracks to playlists and remove tracks from playlists
- Each user can manage only their own playlists

### 4. Favorites
- Users can like or unlike their favorite songs
- Users can view all their liked songs in one place

### 5. Artist Management
- Create and retrieve artists
- Update or delete artist profiles
- Automatically link artists to uploaded tracks
- Restrict track and album creation to artist-role users only

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Framework | NestJS |
| Database | MongoDB (Mongoose) |
| Authentication | JWT |
| File Uploads | Multer |
| Validation | class-validator |
| Storage | Local disk or AWS S3 |


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```