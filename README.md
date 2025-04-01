# NestJS Hexagonal Architecture

## Introduction
This project follows the **Hexagonal Architecture (Ports and Adapters Pattern)** using **NestJS**. Hexagonal Architecture ensures modularity, testability, and maintainability by separating business logic from infrastructure concerns.

## Installation
```sh
npm install
```

## Running the Application
### Development
```sh
npm run start
```
### Production
```sh
npm run build && npm run start:prod
```

## Configuration
Environment variables are managed using `.env` files. Define required variables in `.env` or `.env.example`:
```env
NODE_ENV=
APP_PORT=3005
DATABASE_TYPE=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_SYNCHRONIZE=

AUTH_JWT_SECRET=
AUTH_JWT_TOKEN_EXPIRES_IN=

UPLOAD_LOCATION=upload/

BACKEND_URL=http://localhost:5000/

FRONTEND_URL=http://localhost:3000
```

## Technologies Used
- **NestJS** - Modular and scalable Node.js framework
- **TypeScript** - Static typing for maintainability
- **MySQL** - Relational database support
- **TypeORM** - ORM for database management

## Running Tests
```sh
npm run test
```

## API Documentation
This project includes **Swagger** for API documentation. After running the server, visit:
```
http://localhost:3005/api/v1/api-docs#/
```

## Contributing
1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Submit a Pull Request.

## License
This project is licensed under the **MIT License**.

