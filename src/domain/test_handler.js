const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'test'
});

const addUser = (user) => {
    user.id = uuidv4(); 
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO users (name, password, email) VALUES (?, ?, ?)", 
            [user.name, user.password, user.email], 
            (err, results) => {
                if (err) return reject(err);
                resolve({ ...user }); 
            }
        );
    });
};

addUser({ name: "sarah", password: "test", email: "test@test.se" })
    .then((createdUser) => {
        console.log("User created:", createdUser); 
    })
    .catch((error) => {
        console.error("Error creating user:", error); 
    });

db.end((err) => {
    if (err) {
        console.error("Error closing the connection:", err);
    } else {
        console.log("Database connection closed.");
    }
});
