const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'test'
});

// Function to add a user
const addUser = (user) => {
    user.id = uuidv4(); // Generate a unique ID
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO users (name, password, email) VALUES (?, ?, ?)", // Include id in the insert
            [user.name, user.password, user.email], // Pass id, name, password, and email
            (err, results) => {
                if (err) return reject(err);
                resolve({ ...user }); // Resolve with the user object including the id
            }
        );
    });
};

// Call the addUser function and log the result
addUser({ name: "sarah", password: "test", email: "test@test.se" })
    .then((createdUser) => {
        console.log("User created:", createdUser); // Log the created user
    })
    .catch((error) => {
        console.error("Error creating user:", error); // Log any errors
    });

// Close the database connection after the query is executed (optional)
db.end((err) => {
    if (err) {
        console.error("Error closing the connection:", err);
    } else {
        console.log("Database connection closed.");
    }
});
