const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',    
    user: 'test', 
    password: 'test', 
    database: 'test'   
});

db.connect((err) => {
    if(err) {
        console.error("Error connecting to database!", err);
        return;
    }
    console.log("Connected to database");
});

exports.addUser = (user) => {
    user.id = uuidv4();
    return new promise((resolve, reject) => {
        db.query(
            "INSERT INTO users(name, password, email) VALUES()",
            [user.name , user.password, user.email],
            (err, results) => {
                if(err) return reject(err);
                resolve({...user, id});
            }
        );
    });
};

exports.getUsers = () => {
    return users.map(user => ({
        ...user,
        groups: getUserGroups(user.id)
    }));
};

exports.getUser = (id) => {
    return users.find(user => user.id === id);
};


exports.updateUser = (id, newUserDetails) => {
    let userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex] = {...users[userIndex], ...newUserDetails};
        return true;
    }
    return false;
};


exports.deleteUser = (id) => {
    let initialLength = users.length;
    users = users.filter(user => user.id === id);  // Removed parseInt
    return initialLength !== users.length;
};

exports.addGroup = (groupName) => {
    if (!groups[groupName]) {
        groups[groupName] = [];
        return true;
    }
    return false;
};

exports.listGroups = () => {
    return Object.keys(groups).map(groupName => ({
        name: groupName,
        members: groups[groupName].map(userId =>
            this.getUser(userId)
        )
    }));
};

exports.deleteGroup = (groupName) => {
    if (groups.hasOwnProperty(groupName)) {
        delete groups[groupName];
        return true;
    }
    return false;
};

const getUserGroups = (userId) => {
    return Object.keys(groups).filter(groupName => groups[groupName].includes(userId));
};

exports.addUserToGroup = (userId, groupName) => {
    if (!groups[groupName]) {
        console.log("Group does not exist.");
        return false;
    }

    const userExists = users.some(user => user.id === userId);
    if (!userExists) {
        console.log("User does not exist.");
        return false;
    }

    if (groups[groupName].includes(userId)) {
        console.log("User already in the group.");
        return false;
    }

    groups[groupName].push(userId);
    return true;
};


exports.removeUserFromGroup = (userId, groupName) => {
    if (groups[groupName]) {
        let initialLength = groups[groupName].length;
        groups[groupName] = groups[groupName].filter(id => id !== userId);
        return initialLength !== groups[groupName].length;
    }
    return false;
};

exports.getUserByUsername = (username) => {
    return users.find(user => user.username === username);
};