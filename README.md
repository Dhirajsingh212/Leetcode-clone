## Codepal
This LeetCode clone is an advanced online coding platform designed to offer a seamless and interactive experience for users solving coding challenges. It is built with Next.js to provide a dynamic, server-rendered user interface that ensures fast page loads and responsive design across devices. The backend is powered by Express.js, which facilitates robust API endpoints and efficient handling of user requests.

To ensure smooth communication between the client and server, the platform uses WebSocket, enabling real-time updates such as live coding sessions, instant notifications, and results without page refreshes. Redis plays a crucial role in caching data and managing session persistence, while the PubSub pattern ensures that updates are efficiently broadcast to relevant users or processes, enhancing the overall performance and scalability of the platform.

Prisma is integrated as the ORM for database operations, simplifying complex queries and migrations, and ensuring smooth interaction with the database. For the core functionality of code execution, the platform integrates Judge0, a powerful online code execution engine that allows users to compile and run code in multiple programming languages securely and at scale.

The platform also prioritizes security and user experience by employing JWT-based authentication, with tokens stored securely in cookies, providing a balance between security and ease of access. This authentication mechanism ensures that users can log in, save their progress, and resume coding challenges securely across sessions.

Overall, this platform is built to mirror the functionalities of LeetCode, providing real-time coding environments, challenge-solving capabilities, and smooth user interactions, making it a comprehensive tool for competitive programming and technical interview preparation.

## Tech Stack

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=websocket&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![PubSub](https://img.shields.io/badge/PubSub-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/pubsub)
[![Judge0](https://img.shields.io/badge/Judge0-FF6F00?style=for-the-badge&logo=judge0&logoColor=white)](https://judge0.com/)
[![JWT Authentication](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Cookie](https://img.shields.io/badge/Cookies-FFCA28?style=for-the-badge&logo=cookiecutter&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

## Website view


https://github.com/user-attachments/assets/a15aca79-901a-4028-a39d-c5ba26278e57

## Project setup
### Using docker
### 1.navigate to server
```
cd server
copy .env.example .env
```
env file

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb3"
SECRET="secret"
END="30d"
NODE_ENV="development"
PORT=8000
ORIGIN="http://localhost:3000"
JUDGE0_API_KEY=""
JUDGE0_URL=""
```
add judge0 api key and judge0 url

### 2.navigate to worker
```
cd worker
copy .env.example .env
```
env file
```
JUDGE0_API_KEY=""
JUDGE0_URL=""
```
add judge0 api key and judge0 url

### 3.docker command
```
docker-compose up --build
```


