# GearShare
[![Build Status](https://travis-ci.org/ShaAllFar/gear-share.svg?branch=master)](https://travis-ci.org/ShaAllFar/gear-share)
[![Coverage Status](https://coveralls.io/repos/github/ShaAllFar/gear-share/badge.svg?branch=master)](https://coveralls.io/github/ShaAllFar/gear-share?branch=master)


 GearShare is a marketplace for outdoor winter gear available for rent.

 The purpose of this application is to connect travelers, beginners, and adventurers with local gear junkies. Providing them with the gear they need, and saving them money. This application also helps the local gear junkies make some extra cash by lending out their extra gear.

 ### How it works

 * Browse local listings
 * Chat instantly with the gear junkie
 * Rent your gear!

### User Model
This application contains a multiple resource API that uses MongoDB to serve as a database, and Express.js to handle routing. It uses basic and bearer authentication to give access to new and returning users. The user is able to run CRUD operations, allowing them to create and edit a gallery, create and update a post to their g
alley, and post or delete an image to their post. The models are being used through mongoose that connect with a MongoDB collection. In order to grant a user access, they must receive a valid JSON web token by entering a username, password, email, and location.

# Sign Up

  `http POST localhost:8000/api/signup username='user1' email='user1@email.com' password='1234' profileImageURI='image' location='some place'`

# Sign In

  `http GET localhost:8000/api/signin --auth user1:1234`

### Gallery Model

# Create Gallery
  * POST
  `http POST :8000/api/gallery Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg' name='gallery1' desc='description'`

# Retrieve Gallery
  * GET
  `http GET :8000/api/gallery/5877d8a588fb0638e2438766 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg'`

# Update Gallery
  * PUT
  `http PUT :8000/api/gallery/5877d8a588fb0638e2438766 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg' name='new gallery'`

# Delete Gallery
  * DELETE
  `http DELETE :8000/api/gallery/5877d8a588fb0638e2438766 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg'`

### Post Model

# Create Post
  * POST
  `http POST :8000/api/gallery/5877dca488fb0638e2438767/post Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg' name='post' desc='description' userID='5877d28d88fb0638e2438765' galleryID='5877dca488fb0638e2438767' price='100'`

# Retrieve Post
  * GET
  `http GET :8000/api/gallery/5877dca488fb0638e2438767/post/5877dfef88fb0638e2438768 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg'`

# Update Post
  * PUT
  `http PUT :8000/api/gallery/5877dca488fb0638e2438767/post/5877dfef88fb0638e2438768 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg' name='new post'`

# Delete Post
  * DELETE
