# MERN Stack Chat App - Chatpack (Still in development)


## Overview

Chatpack is a real-time messaging application built using the MERN stack (MongoDB, Express.js, React, and Node.js) with WebSockets for live communication. The app enables users to create private chats and group conversations while maintaining a seamless.

> This project still in development and a lot of future will come soon.
#### Key Features:

✅ **Create Private Chats & Groups** – Users can initiate one-on-one conversations or form group chats.
✅ **Real-Time Messaging** – Messages are instantly delivered using WebSocket connections.
✅ **Persistent Chat History** – Conversations are stored in MongoDB for easy retrieval.
🛠️ **Emoji and File** – Users can send emoji and file.
🛠️ **Block Users** – Users can block/unblock others for a safer experience.
🛠️ **Update User Settings** – Customize profile details and preferences.
🛠️ **Form Validations** – Ensures secure and accurate input across the app.
🛠️ **Cache Mechanism** – Implementation cache mechanism using redis.
🛠️ **Multi-Language Support** – Choose your preferred language for a better user experience.

#### Tech Stack:

- **Frontend**:
     
    - React.js
    - Typescript
    - Redux Toolkit
    - Redux Toolkit Query
    - Socket\.io
    - Shadcn

- **Backend**:
     
    - Node.js
    - Express.js
    - Socket\.io
    - MongoDB + Mongoose
    - JWT Auth

- **DevOps & Deployment**:
    - Docker – Containerization.
    - AWS – S3 Bucket for storing images 
    - CI/CD (GitHub Actions) 


## Installation

#### Install Packages
```shell
cd backend
yarn
cd ..
cd frontend
yarn
```
#### Set environment variables

- For `/frontend` directory you don't need to change anything, but if you change port you have to reconfigure to docker files.

    ```basic
    VITE_BASE_URL=http://localhost:3000
    VITE_NODE_ENV=development
    ```

- For `/backend` You can set the variables by looking at `env.example` (if you are running with docker you can leave `MONGO_URI` as it is)

    ```basic
    PORT=3000
    ENV=development
    MONGO_URI=mongodb://mongo:27017/chatpack
    ACCESS_TOKEN_SECRET=
    REFRESH_TOKEN_SECRET=
    AWS_BUCKET_NAME=
    AWS_BUCKET_REGION=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_URL=
    ```

#### Run application



```shell
cd backend
yarn dev
# open another terminal and
cd frontend
yarn dev
```
and go `http://localhost:5173`
#### Run application with Docker

```shell
docker compose up
```
and go `http://localhost:5000`
