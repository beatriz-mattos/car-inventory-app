# Car Inventory App :car:

This is a application for managing a car inventory. It provides endpoints for adding, deleting, and soft-deleting cars. Soft-deleted cars are permanently deleted after a certain period of time.

## Tecnologies Used
- Node.js
- Express.js
- Knex.js
- PostgreSQL
- Tests: Mocha (testing framework), Chai (assertion library), Sinon and Axios (mock library)

## Installation
1. Clone the repository:
```git clone https://github.com/your-username/car-inventory-app.git```

2. Install the dependencies:
```cd car-inventory-app/backend && npm install```

4. Set up the database:
Use the variables in the .env.example file to set up your database configuration by creating a .env file in the current directory.
```touch .env```

5. Run the migrations queries on database:
```npx knex migrate:latest```

6. Start the server. It will start running on http://localhost:3000.
```npm start```

## Documentation: https://documenter.getpostman.com/view/27232332/2s93mBxzJb
