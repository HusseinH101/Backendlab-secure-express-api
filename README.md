# Backendlab-secure-express-api-taskmanager


A backend lab project built with **Node.js**, **Express**, **MySQL**, **EJS**, and the **MVC pattern**.

The application includes:
- a REST API for task management
- database storage with MySQL
- API key protection
- JWT-based login and protected routes
- web pages using EJS
- CRUD for tasks through browser forms
- session-based flash messages

---

## What the project does

This project is a task manager application where tasks can be:

- created
- viewed
- updated
- deleted

The project has two parts:

### 1. API part
The API allows requests using JSON and includes:
- `GET`, `POST`, `PUT`, `DELETE`
- API key protection for selected routes
- JWT authentication for protected routes

### 2. Web part
The web interface allows task management through browser pages and forms:
- landing page
- today's date / Friday page
- view all tasks
- view one task
- create task
- edit task
- delete task
- flash messages after actions

---

## Project structure

```text
src/
  config/
  controller/
  middleware/
  model/
  route/
  service/
  utils/
  express.js

views/
public/
app.js