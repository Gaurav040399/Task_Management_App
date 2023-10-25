# Task Management App

**Description**: This is a simple Task Management App with user registration and task management features.

## Routes

- **Register New User**
  - **Route**: `POST /user/register`
  - **Description**: Register a new user.

- **User Login**
  - **Route**: `POST /user/login`
  - **Description**: Allow registered users to log in.

- **Create New Task**
  - **Route**: `POST /task/create`
  - **Description**: Create a new task.

- **Get All Tasks**
  - **Route**: `GET /task/`
  - **Description**: Retrieve a list of all tasks.

- **Get Single Task by ID**
  - **Route**: `GET /task/:id`
  - **Description**: Retrieve a single task by its unique ID.

- **Update Task**
  - **Route**: `PATCH /task/update/:id`
  - **Description**: Update an existing task.

- **Delete Task**
  - **Route**: `DELETE /task/delete/:id`
  - **Description**: Delete a task by its ID.

- **Admin Task and User Overview**
  - **Route**: `GET /task/admin/user`
  - **Description**: Allow admin users to view all users and their respective tasks.

## Usage

- To get started with this app, you can follow these API routes to manage tasks and users.

## Installation

- You can install the necessary dependencies by running:
  ```bash
  npm install
