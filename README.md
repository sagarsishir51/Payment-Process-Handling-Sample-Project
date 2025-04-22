# NestJS Hexagonal Architecture

## Introduction

This project demonstrates how to **integrate online payments** in a **NestJS application** using the **Factory Pattern**, structured within a robust **Hexagonal Architecture**.

It serves as a hands-on guide to building a modular and scalable payment system that supports multiple payment gateways (e.g., **eSewa**, **Khalti**). The project is being documented through a detailed multi-part blog series to help developers adopt best practices and clean architecture in real-world NestJS applications.

Whether you're new to Hexagonal Architecture or looking to streamline payment integrations, this repository will provide a solid foundation to build on.

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

## Base Repo
This project extends [Nestjs-Hexagonal-Architecture-Demo-Project](https://github.com/sagarsishir51/Nestjs-Hexagonal-Architecture-Demo-Project).
📖 Dive deeper with this helpful  [Medium blog post.](https://medium.com/@sagarsishir51/mastering-hexagonal-architecture-in-nestjs-a-practical-guide-ccc10ed155bf)

## Seeding the Database
This project includes a **seeding feature** to populate the database with initial data. Run the following command to seed the database:
```sh
npm run seed
```

## Database Migrations
This project includes **TypeORM migration** support for database schema changes.
- **Generate a new migration**:
  ```sh
  npm run migration:generate
  ```
- **Run pending migrations**:
  ```sh
  npm run migration:run
  ```
## 📝 Blog Series

This project is supported by a **multi-part blog series** that walks through the concepts and implementation of **Hexagonal Architecture in NestJS**, with a focus on **online payment integration** using the **Factory Pattern**.

### 📚 Blog Parts
- **Part 1 – Integrating Online Payment in NestJS using Factory Pattern: Project Setup, Service Layer and APIs (Part 1)** *(Coming Soon)*

- **Part 2 – Integrating Online Payment in NestJS using Factory Pattern: eSewa Payment (Part 2)** *(Coming Soon)*

- **Part 3 – Integrating Online Payment in NestJS using Factory Pattern: Khalti Payment (Part 3)** *(Coming Soon)*

🔔 Stay tuned! More parts will be added as the series progresses.  
📬 Follow [@sagarsishir51](https://medium.com/@sagarsishir51) on Medium for updates.

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

