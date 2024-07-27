# Full-Stack Todo Application

This project is a full-stack Todo application built using the MERN stack (MongoDB, ExpressJS, React, Node.js) with TypeScript. It allows users to perform CRUD operations on their todo items.

# Hi ✋ i'm Olatunbosun a Full stack developer

## Tech Stack

- **Backend**: Node.js with ExpressJS
- **Frontend**: React with TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Hashing**: bcryptjs
- **Environment Management**: dotenv

## Project Setup

### Backend

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/Derrick99234/Todo_Mern_App.git
    cd todo-app/backend
    ```

2.  **Install Dependencies**

        ```bash
        npm install
        ```

    `

3.  **Run the Backend**

    ```bash
    npx ts-node src/index.ts
    ```

4.  **API Endpoints**

    - `POST /create_todo` - Create a new todo
    - `PUT /edit_todo/:todoID` - Get all todos
    - `GET /get_todo` - Get a todo by ID
    - `DELETE /delte_todo/:todoID` - Delete a todo by ID

### Frontend

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Frontend**

   ```bash
   npm run dev
   ```

4. **Usage**

   - **Add Todo**: Click the "Add Todo" button to open the form and add a new todo.
   - **Edit Todo**: Click on the "Edit" button next to a todo to modify it.
   - **Delete Todo**: Click on the "Delete" button next to a todo to remove it from the list.

## Code Structure

### Backend

- **`src/index.ts`**: Main entry point of the application.
- **`src/controllers/todoController.ts`**: Contains the logic for handling requests related to todos.
- **`src/models/todo.model..ts`**: Mongoose schema and model for todos.
- **`src/routes/todoRoutes.ts`**: Defines routes for todos.
- **`src/config/db.ts`**: Handles database connection.
- **`src/middleware/verifyJWT.ts`**: Middleware for JWT authentication.

## Development

- **Backend**: Make sure MongoDB is running locally or provide a remote MongoDB URI in the `.env` file.
- **Frontend**: Ensure the backend server is running to make API requests.

## Contributing

1. **Fork the Repository**
2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add a descriptive commit message"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/your-feature
   ```

5. **Create a Pull Request**

## Contact

For any questions or concerns, feel free to reach out to [pshubomi@email.com](mailto:pshubomi@gmail.com).
