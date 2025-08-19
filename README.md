# Mini Leave Management System

A full-stack web application designed as a simple and efficient leave management portal for small to medium-sized businesses. This system allows employees to request time off and provides HR personnel with the tools to manage and track these requests seamlessly.

---

## 🚀 Live Demo

You can view the live deployed application here:

**[https://leave-management-seven-eta.vercel.app/](https://leave-management-seven-eta.vercel.app/)**

---

## ✨ Features

The application supports two distinct user roles with tailored functionalities:

### 🧑‍💼 Employee
* **Authentication**: Secure registration and login.
* **Dashboard**: A personalized view of their available leave balance.
* **Leave Application**: A simple form to apply for new leave requests.
* **Leave History**: A comprehensive table displaying the status (Pending, Approved, Rejected) of all past and present leave requests.

### 👩‍💻 HR (Human Resources)
* **Authentication**: Secure login to the admin dashboard.
* **Employee Overview**: A complete list of all employees in the system and their current leave balances.
* **Request Management**: A centralized table of all leave requests from all employees.
* **Approve/Reject**: One-click buttons to approve or reject pending leave requests, which automatically updates the employee's leave balance.

---

## 🛠️ Tech Stack

This project is built with a modern, full-stack JavaScript architecture.

* **Frontend**: React, Vite, Tailwind CSS, Axios, React Router
* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **ORM**: Sequelize
* **Authentication**: JSON Web Tokens (JWT), bcryptjs

---

## 🏛️ System Architecture

The application follows a standard 3-tier architecture, separating the client-side, server-side, and database concerns for scalability and maintainability.

* **Frontend (Vercel)**: A responsive React single-page application that provides the user interface.
* **Backend (Render)**: A RESTful API built with Node.js and Express that handles all business logic, user authentication, and data processing.
* **Database (Render)**: A PostgreSQL database that stores all user, employee, and leave request data.

*(You can insert your High-Level Design diagram image here)*

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later)
* npm
* A local PostgreSQL instance

### Local Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Sankalpa-01/Leave-Management.git](https://github.com/Sankalpa-01/Leave-Management.git)
    cd Leave-Management
    ```

2.  **Backend Setup:**
    * Navigate to the backend directory:
        ```sh
        cd backend
        ```
    * Install NPM packages:
        ```sh
        npm install
        ```
    * Create a `.env` file in the `backend` directory and add the following variables. Replace the values with your local database credentials.
        ```env
        # .env.example
        PORT=5000
        DATABASE_URL="postgres://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/YOUR_DB_NAME"
        JWT_SECRET="YOUR_SUPER_SECRET_JWT_KEY"
        FRONTEND_URL="http://localhost:5173"
        ```
    * Start the backend server:
        ```sh
        npm run dev
        ```

3.  **Frontend Setup:**
    * Navigate to the frontend directory from the root folder:
        ```sh
        cd frontend
        ```
    * Install NPM packages:
        ```sh
        npm install
        ```
    * Create a `.env` file in the `frontend` directory and add the following variable:
        ```env
        # .env.example
        VITE_API_BASE_URL="http://localhost:5000/api"
        ```
    * Start the frontend development server:
        ```sh
        npm run dev
        ```

The application should now be running locally, with the frontend at `http://localhost:5173` and the backend at `http://localhost:5000`.

---

## 🌐 API Endpoints

The backend exposes the following RESTful API endpoints:

| Method | Endpoint                    | Description                           | Access    |
| :----- | :-------------------------- | :------------------------------------ | :-------- |
| `POST` | `/api/auth/register`        | Register a new user (Employee or HR). | Public    |
| `POST` | `/api/auth/login`           | Log in an existing user.              | Public    |
| `GET`  | `/api/employees/all`        | Get a list of all employees.          | HR        |
| `GET`  | `/api/employees/:id/balance`| Get the leave balance for an employee.| Employee  |
| `POST` | `/api/leaves/apply`         | Submit a new leave request.           | Employee  |
| `GET`  | `/api/leaves/all`           | Get all leave requests.               | HR        |
| `GET`  | `/api/leaves/employee/:id`  | Get all leaves for a single employee. | Employee  |
| `PUT`  | `/api/leaves/:id`           | Approve or reject a leave request.    | HR        |

---

## 🚀 Deployment

* The **Frontend** is deployed on **Vercel**.
* The **Backend** and **PostgreSQL Database** are deployed on **Render**.

---

## 🔮 Potential Improvements

* **Email Notifications**: Integrate a service like Nodemailer to send email alerts on leave application and status changes.
* **Manager Role**: Introduce a "Manager" role who can approve leaves for their direct reports.
* **Company Calendar**: Add a shared calendar view to visualize who is on leave to help with team planning.
* **Leave Types**: Differentiate between leave types (e.g., Sick, Vacation, Unpaid) with separate balances.
* **File Attachments**: Allow employees to attach documents (e.g., doctor's notes) to their leave requests.
