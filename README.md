

## Description

🎵 Music API

A NestJS-based REST API for managing, streaming, and tracking music tracks. Features include:

1, Track Managment
   -Upload music tracks using genre,artist and title
   -Display trending tracks
   -search tracks by title,artist
   -Stream tracks with byte-range support

2, User Managment
  -Secure login and token managment using JWT-based signup and login
  -users can manage their profile
  -users can create an artist to upload tracks 

3, playlist Managment
   -users can create,delete,add tracks and deletetracks from the playlist of their own

4, favorites
  -users can like their favorite songs
  -users can see their favorite songs
 
5, Artist Managment
  -Create & get artists  
  -Update / delete artists  
  -Auto-link artists to uploaded tracks  
  -Restrict creation of albums/tracks to artist users



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