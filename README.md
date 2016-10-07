# Ombud DevOps Technical Test 2016

## Intro

Hello and thank you for your interest in joining the Ombud team. We believe the best way to evaluate DevOps candidates is a coding challenge.

For your project, we'd like you to complete as much of the following as you can. We expect this project to take no more than MAX_TIME hours (typically AVG_TIME). Please reach out to us if you get stuck and we'll help get you back on track.

## Project Description

For this project we'd like you to build a RESTful HTTP API for logging arbitrary JSON payloads to a persistent data store and for fetching the log data, ordered by the time it was logged.  

We would like to see this implemented in a fully-containerized (Docker) development environment so that any developer need only clone the repository and issue a ```docker-compose up``` command to interact with the API via curl.

Minimum Functionality:

* The API should implement a ```POST /logs``` endpoint that accepts a JSON payload of arbitrary structure
* The API should implement a ```GET /logs``` endpoint that returns a JSON array of logged data.
  - The return payload should somehow denote the time the each datum was logged.
* The API should be accessible at http://localhost on port 80
* Data store should be appropriate for a logging use-case, be prepared to justify your choice
* Data should persist through restarts of the development environment

Bonus:

* Record other data that may be relevant to a logging use-case.
* Handle API error conditions in a RESTful way.
* Implement paging for the ```GET /logs``` endpoint
* Data store container should not be network accessible from localhost.
* API container hot-reloads when code is modified locally

## Requirements

* All work should be committed to this GitHub repository.
  - You may structure the code in any way you see fit, deleting or modifying any of the code herein.  
* The server should be written in node.js
  - An Express server stub is provided in the _/src_ directory. Feel free to use that, or start from scratch with any node.js framework of your choosing.
* The development environment should be containerized using tools included in the standard Docker install.
* All source code committed to the repository should be your own work - _any external, runtime dependencies are OK_
  - References to npm libraries in package.json are OK
  - References to Docker images in docker-compose.yml are OK
* Any additional _languages / frameworks / tools_ are acceptable, but be prepared to advocate for their use.

## Criteria

#### Does it work?

The finished application should run from the cloned repo directory by issuing a single ```docker-compose up``` command without modifying the end-user's environment. The running application should implement some or all of the functionality described above.

#### Code Quality

Your code should be written with a consistent coding style, good organization, etc.

## Evaluation

Let us know when you're finished.

We'll review the app and invite you to the office to for a demo and code review session.
