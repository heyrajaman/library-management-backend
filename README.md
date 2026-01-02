# 📚 Library Management System – Backend

A **secure, scalable backend** for a Library Management System built using **Node.js, Express, SQL (MySQL), Sequelize ORM, Microservices architecture, API Gateway, and JWT authentication**.

This project is designed according to the **Software Requirement Specification (SRS)** and follows **industry-level backend practices**.

---

## 🚀 Features

### 🔐 Authentication & Security

- Admin login using **JWT (JSON Web Token)**
- Password hashing with **bcrypt**
- Protected APIs (Members, Books, Circulation, Fines)
- Stateless authentication (microservice-friendly)

### 🧩 Microservices Architecture

- Independent services with separate databases
- Single entry point via **API Gateway**
- Loose coupling and scalability

### 📘 Core Library Features

- Member management (add, update, view)
- Book inventory management
- Book issue, return, and renewal
- Fine calculation and payment
- Overdue and summary reports

---

## 🏗️ Architecture Overview

Each microservice:

- Has its **own Express server**
- Uses **its own SQL database**
- Verifies JWT independently

---

## 📂 Project Structure

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **Sequelize ORM**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **dotenv**
- **express-http-proxy**
- **Thunder Client / Postman**

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
DB_USER=root
DB_PASS=your_mysql_password
DB_HOST=localhost

AUTH_DB_NAME=auth_db
MEMBER_DB_NAME=member_db
BOOK_DB_NAME=book_db
CIRCULATION_DB_NAME=circulation_db
FINE_DB_NAME=fine_db

JWT_SECRET=supersecretkey


CREATE DATABASE auth_db;
CREATE DATABASE member_db;
CREATE DATABASE book_db;
CREATE DATABASE circulation_db;
CREATE DATABASE fine_db;

npm install

node auth-service/index.js
node member-service/index.js
node book-service/index.js
node circulation-service/index.js
node fine-service/index.js


node api-gateway/index.js

Authorization: Bearer <JWT_TOKEN>

POST http://localhost:4000/api/auth/login

POST   /api/members
GET    /api/members
PUT    /api/members/:id


POST   /api/books
GET    /api/books
PUT    /api/books/:id
DELETE /api/books/:id

POST /api/circulation/issue
POST /api/circulation/return/:id
POST /api/circulation/renew/:id

GET  /api/fines/overdue
POST /api/fines
POST /api/fines/pay/:id



---
```
