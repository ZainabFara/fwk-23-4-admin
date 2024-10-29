const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");

const db = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "test",
  database: "test",
});

const addUser = (user) => {
  user.id = uuidv4();
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (name, password, email, uuid) VALUES (?, ?, ?, ?)",
      [user.name, user.password, user.email, user.id],
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

getUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getUser = (name) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE name = ?", [name], (err, results) => {
      if (err) return reject(err);
      if (results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
};

getUser("sarah").then((user) => {
  if (user) {
    console.log("User found:", user);
  } else {
    console.log("No user found with that name.");
  }
});

getUsers().then((users) => {
  console.log("All users:", users);
});

db.end((err) => {
  if (err) {
    console.error("Error closing the connection:", err);
  } else {
    console.log("Database connection closed.");
  }
});
