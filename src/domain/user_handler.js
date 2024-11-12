const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "test",
  database: "test",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database!", err);
    return;
  }
  console.log("Connected to database");
});

exports.addUser = (user) => {
  user.id = uuidv4();
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users(username, password, email, uuid, role) VALUES(?, ?, ?, ?, ?)",
      [user.name, user.password, user.email, user.id, user.role],
      (err, results) => {
        if (err) return reject(err);
        resolve({ ...user });
      }
    );
  });
};

exports.getUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.getUser = (name) => {
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

exports.updateUser = (id, newUserDetails) => {
  let userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...newUserDetails };
    return true;
  }
  return false;
};

exports.deleteUser = (name) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM users WHERE name = ?", [name], (err, results) => {
          if (err) return reject(err);
        });
      });
};

// exports.addGroup = (groupName) => {
//   if (!groups[groupName]) {
//     groups[groupName] = [];
//     return true;
//   }
//   return false;
// };

// exports.listGroups = () => {
//   return Object.keys(groups).map((groupName) => ({
//     name: groupName,
//     members: groups[groupName].map((userId) => this.getUser(userId)),
//   }));
// };

// exports.deleteGroup = (groupName) => {
//   if (groups.hasOwnProperty(groupName)) {
//     delete groups[groupName];
//     return true;
//   }
//   return false;
// };

// const getUserGroups = (userId) => {
//   return Object.keys(groups).filter((groupName) =>
//     groups[groupName].includes(userId)
//   );
// };

// exports.addUserToGroup = (userId, groupName) => {
//   if (!groups[groupName]) {
//     console.log("Group does not exist.");
//     return false;
//   }

//   const userExists = users.some((user) => user.id === userId);
//   if (!userExists) {
//     console.log("User does not exist.");
//     return false;
//   }

//   if (groups[groupName].includes(userId)) {
//     console.log("User already in the group.");
//     return false;
//   }

//   groups[groupName].push(userId);
//   return true;
// };

// exports.removeUserFromGroup = (userId, groupName) => {
//   if (groups[groupName]) {
//     let initialLength = groups[groupName].length;
//     groups[groupName] = groups[groupName].filter((id) => id !== userId);
//     return initialLength !== groups[groupName].length;
//   }
//   return false;
// };

// exports.getUserByUsername = (username) => {
//   return users.find((user) => user.username === username);
// };

// db.end((err) => {
//   if (err) {
//     console.error("Error closing the connection:", err);
//   } else {
//     console.log("Database connection closed.");
//   }
// });
