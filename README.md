# MyStore
My Store is a full-stack e-commerce app built using the MERN Stack.
I've built it with Chakra ui components in order to learn how to use a component system. The DB is created when the backend server is ran, so you have to change the DB url as shown in instructions.

## Features
- Create and edit products
- Browse products
- Responsive design

## Technologies Used

- **Frontend**: React.js, Zustand, React Router, Chakra UI
- **Backend**: Node.js, Express.js, Mongoose

## Instructions

1.Clone the repository

2.Install dependencies:
    -For backend(from root):
    cd backend
    npm install
        
    -For frontend(from root):
    npm install

3.Setup enviroment variables:
PORT=5000 (The Port needs to be 5000 because of the frontend/store/products.js file)

MONGO_URL=your_mongodb_connection_string

4. Start the application:
    -Backend server(from root):
    cd backend
    npm run start (to run server.js with node) 
    OR
    npm run devStart to (run server.js with nodemon)

5.Open your browser on http://localhost:5173