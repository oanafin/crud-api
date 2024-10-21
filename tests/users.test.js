import http from 'http';
import request from 'supertest';
import app from '../src/app';

let server;

beforeAll(async () => {
  server = http.createServer(app).listen(3001);
});

afterAll(async () => {
  await server.close();
});

describe('User API', () => {
    let userId;

    it('should return an empty array when getting all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    it('should create a new user', async () => {
        const newUser = { username : 'oanafin', age: 37, hobbies: [] };
        const res = await request(app).post('/api/users').send(newUser);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        userId = res.body.id;
    });

    it('should get the created user by ID', async () => {
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', userId);
    });

    it('should update the created user', async () => {
        const updatedUser = { username: 'Olzhas', age: 38, hobbies: ['coding']};
        const res = await request(app).put(`/api/users/${userId}`).send(updatedUser);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username','Olzhas');
    });

    it('should delete the created user', async () => {
        const res = await request(app).delete(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(204);
    });

    it('should return 404 when getting the deleted user by ID', async () => {
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(404);
    });

});
