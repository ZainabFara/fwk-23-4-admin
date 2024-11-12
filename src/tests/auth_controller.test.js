const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../controllers/admin_controller'); // Adjust the path as needed

// Create an Express app for testing purposes
const app = express();
app.use(bodyParser.json());

// Set up routes
app.post('/api/users', userRoutes.createUser);
app.get('/api/users', userRoutes.getAllUsers);
app.get('/api/users/:id', userRoutes.getUser);
app.put('/api/users/:id', userRoutes.updateUser);
app.delete('/api/users/:name', userRoutes.deleteUser);
// app.post('/api/groups', userRoutes.createGroup);
// app.get('/api/groups', userRoutes.getGroups);
// app.delete('/api/groups/:name', userRoutes.deleteGroup);
// app.post('/api/users/:id/groups', userRoutes.addUserToGroup);
// app.delete('/api/users/:id/groups/:groupName', userRoutes.removeUserFromGroup);

describe('User and Group Handler Tests', () => {
    
    describe('POST /api/users', () => {
        it('should create a new user and return status 201', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({ username: 'sarah', password: 'password', email: 'test@test.com', role:"user", uuid:"123" });
            
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('username', 'sarah');
        });
    });

    describe('GET /api/users', () => {
        it('should return all users with status 200', async () => {
            const res = await request(app).get('/api/users');
            
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /api/users/:id', () => {
        it('should return a user by ID with status 200', async () => {
            const res = await request(app).get('/api/users/1'); // Replace with a valid ID if needed
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', 1); // Adjust to match expected user data
        });

        it('should return 404 if the user is not found', async () => {
            const res = await request(app).get('/api/users/9999'); // Non-existent ID
            expect(res.status).toBe(404);
            expect(res.text).toBe('User not found');
        });
    });

    describe('PUT /api/users/:id', () => {
        it('should update a user by ID and return status 200', async () => {
            const res = await request(app)
                .put('/api/users/1') // Replace with a valid ID if needed
                .send({ name: 'updatedName' });

            expect(res.status).toBe(200);
            expect(res.text).toBe('User updated successfully');
        });

        it('should return 404 if the user is not found', async () => {
            const res = await request(app)
                .put('/api/users/9999') // Non-existent ID
                .send({ name: 'updatedName' });

            expect(res.status).toBe(404);
            expect(res.text).toBe('User not found');
        });
    });

    describe('DELETE /api/users/:name', () => {
        it('should delete a user by name and return status 200', async () => {
            const res = await request(app).delete('/api/users/sarah');
            expect(res.status).toBe(200);
            expect(res.text).toBe('User deleted successfully');
        });

        it('should return 404 if the user is not found', async () => {
            const res = await request(app).delete('/api/users/nonexistent');
            expect(res.status).toBe(404);
            expect(res.text).toBe('User not found');
        });
    });
});
//     describe('POST /api/groups', () => {
//         it('should create a new group and return status 201', async () => {
//             const res = await request(app)
//                 .post('/api/groups')
//                 .send({ name: 'testGroup' });
            
//             expect(res.status).toBe(201);
//             expect(res.text).toBe("Group 'testGroup' created successfully.");
//         });
//     });

//     describe('GET /api/groups', () => {
//         it('should return all groups with status 200', async () => {
//             const res = await request(app).get('/api/groups');
//             expect(res.status).toBe(200);
//             expect(Array.isArray(res.body)).toBe(true);
//         });
//     });

//     describe('DELETE /api/groups/:name', () => {
//         it('should delete a group and return status 200', async () => {
//             const res = await request(app).delete('/api/groups/testGroup');
//             expect(res.status).toBe(200);
//             expect(res.text).toBe("Group 'testGroup' deleted successfully.");
//         });

//         it('should return 404 if the group is not found', async () => {
//             const res = await request(app).delete('/api/groups/nonexistentGroup');
//             expect(res.status).toBe(404);
//             expect(res.text).toBe('Group not found');
//         });
//     });

//     describe('POST /api/users/:id/groups', () => {
//         it('should add a user to a group and return status 200', async () => {
//             const res = await request(app)
//                 .post('/api/users/1/groups') // Replace with a valid user ID
//                 .send({ groupName: 'testGroup' });
            
//             expect(res.status).toBe(200);
//             expect(res.text).toBe('User added to testGroup successfully.');
//         });
//     });

//     describe('DELETE /api/users/:id/groups/:groupName', () => {
//         it('should remove a user from a group and return status 200', async () => {
//             const res = await request(app).delete('/api/users/1/groups/testGroup'); // Replace with valid IDs
//             expect(res.status).toBe(200);
//             expect(res.text).toBe('User removed from testGroup successfully.');
//         });
//     });
// });
