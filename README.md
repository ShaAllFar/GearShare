![GearShare Logo] (img/gear-share-small.png) GearShare
[![Build Status](https://travis-ci.org/ShaAllFar/gear-share.svg?branch=master)](https://travis-ci.org/ShaAllFar/gear-share)
[![Coverage Status](https://coveralls.io/repos/github/ShaAllFar/gear-share/badge.svg?branch=master)](https://coveralls.io/github/ShaAllFar/gear-share?branch=master)

![CodeFellows](https://img.shields.io/badge/Code%20Fellows-Approved-brightgreen.svg)


 GearShare is a marketplace for outdoor winter gear available for rent.

 The purpose of this application is to connect travelers, beginners, and adventurers with local gear enthusiasts. Providing them with the gear they need, and saving them money. This application also helps local gear enthusiasts make some extra cash by lending out their extra gear.

### How it works

As a gear seeker
 * Browse local listings
 * Chat instantly with a gear enthusiast
 * Rent your gear!

As a gear enthusiasts
 * Create a profile
 * Add posts of your gear to your gallery
 * Respond to a gear seeker
 * Rent out your gear!

### User Model

This application contains a multiple resource API that uses MongoDB to serve as a database, and Express.js to handle routing. It uses basic and bearer authentication to give access to new and returning users. The user is able to run CRUD operations, allowing them to create and edit a gallery, create and update a post to their galley, and add or delete an image from their post. All images are housed using Amazon Web Services S3 storage. The models are being used through mongoose that connect with a MongoDB collection. In order to grant a user access, they must receive a valid JSON web token by entering a username, password, email, and location.

# Set Up

In your Terminal

```sh
$ git clone https://github.com/ShaAllFar/gear-share.git
$ cd gear-share
$ npm i
```
This will install the proper dependencies from the package.json file.

### Use

You will need to have 3 terminal shells open to use this application.

* In one shell, run `mongod` to start the database.
* In another shell, run `npm run start`. You will receive a response of 'server live on PORT: `<PORT>`'
* The last shell will be used to make GET, PUT, POST, and DELETE requests

# Sign Up

  ```
  http POST localhost:8000/api/signup username='user1' email='user1@email.com' password='1234' profileImageURI='image' location='some place'
  ```

# Sign In

  `http GET localhost:8000/api/signin --auth user1:1234`

### Gallery Model

# Create Gallery
  POST
  ```sh
  http POST :8000/api/gallery Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg' name='gallery1' desc='description'
  ```

# Retrieve Gallery
  GET
  ```sh
  http GET :8000/api/gallery/5877d8a588fb0638e2438766 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg'
  ```

# Update Gallery
  PUT
  ```sh
  http PUT :8000/api/gallery/5877d8a588fb0638e2438766 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg' name='new gallery'
  ```

# Delete Gallery
  DELETE
  ```sh
  http DELETE :8000/api/gallery/5877d8a588fb0638e2438766 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg'
  ```

### Post Model

# Create Post
  POST
  ```sh
  http POST :8000/api/gallery/5877dca488fb0638e2438767/post Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg' name='post' desc='description' userID='5877d28d88fb0638e2438765' galleryID='5877dca488fb0638e2438767' price='100'
  ```

# Retrieve Post
  GET
  ```sh
  http GET :8000/api/gallery/5877dca488fb0638e2438767/post/5877dfef88fb0638e2438768 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg'
  ```

# Update Post
  PUT
  ```sh
  http PUT :8000/api/gallery/5877dca488fb0638e2438767/post/5877dfef88fb0638e2438768 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg' name='new post'
  ```

# Delete Post
  * DELETE
    * ```
  http DELETE :8000/api/gallery/5877dca488fb0638e2438767/post/5877dfef88fb0638e2438768 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg' name='new post'
  ```

### Image Model

# Upload Image
  POST
  ```sh
  http --form POST :8000/api/gallery/5877dca488fb0638e2438767/post/5877dfef88fb0638e2438768/image Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg' image@./test/data/tester.png
  ```
# Delete Image
  DELETE
  ```sh
  http --form DELETE :8000/api/gallery/5877dca488fb0638e2438767/post/5877dfef88fb0638e2438768/image/5877dfef88fb0638e243876 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGQxOGIzYWNiYmUwMGEwNjg2ZmQzODExOWJkMGI1ZGNiYmM3Mzg4ZmNlMGZjOWRmMDRkZjFhMmUzNzExNzYiLCJpYXQiOjE0ODQyNDc3MTR9.mTuf2mgKfh8pJ4DeAd1ZiFPqdhgH1KFKQf32J1LybOg'
  ```

## Repo Structure Diagram
![Mind Map] (img/Gear-Share.png)

## Team

Erick Mock - https://github.com/kcirekcom

Shawn Farrow - https://github.com/ShaAllFar

Daniel Becker - https://github.com/dbecker4130
