# CS-554 Lab 6

## IPC

For this lab, you will expand your API from last week, this time with PUT, POST, and DELETE routes that will be handled over a worker.

You will also continue to practice your usage of redis and async / await usage.

You will promisify the redis-client for use, and you will use all of its methods with the use of the await keyword.

For this lab, you will use a worker to do all database-like operations (Create, Read, Update, and Delete). Normally, you would only pass writes off to the worker.

You will not have to utilize a cache for this assignment

You will need to run two programs!

For this assignment, you will use 1 project and just run 2 seperate terminal windows to run both worker.js and npm start for your server.

## Your worker

You will make a file, worker.js, that performs 2 tasks:

When the worker starts up, it will download the dummy data (Links to an external site.) and store it in memory, similar to last week.
You will implement Create, Read, Update, and Delete Operations that can be called from your server that will search through this data and return a response over the redis pub/sub setup

## Your Routes

You will only have 4 routes!


**GET /api/people/:id**


This route will publish a message to request a person from the worker, and render JSON of the person (or of an error, should once occur)

**POST /api/people**

This route will publish a message to request that the worker creates a person, and render JSON of the person created (or of an error, should once occur)

**DELETE /api/people/:id**

This route will publish a message to request that the worker deletes a person, and render JSON stating that the operation completed (or of an error, should once occur)

**PUT /api/people/:id**

This route will publish a message to request that the worker updates a person, and render JSON of the person updated (or of an error, should once occur)