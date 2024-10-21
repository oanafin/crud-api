import express from 'express';
import { v4 as uuidv4, validate as isUuid } from 'uuid';

const router = express.Router();

let users = [];

// GET all users
router.get('/', (req, res) => {
    res.status(200).send(users);
});

// GET user by id
router.get('/:id', (req, res) => {
    if (!isUuid(req.params.id)) return res.status(400).send('Invalid UUID');

    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).send('User not found');

    res.status(200).send(user);
})

// POST create new user 
router.post('/', (req, res) => {
    const { username, age, hobbies } = req.body;
    if (!username || !age) return res.status(400).send('Missing required fields');

    const newUser = { id: uuidv4(), username, age, hobbies };
    users.push(newUser);
    res.status(201).send(newUser);
});

// PUT update user
router.put('/:id', (req, res) => {
    if (!isUuid(req.params.id)) return res.status(400).send('Invalid UUID');

    const userIndex = users.findIndex(u => u.id == req.params.id);
    if (userIndex === -1) return res.status(404).send('User not found');

    const { username, age, hobbies } = req.body;
    if (!username || !age) return res.status(400).send('Missing required fields');

    users[userIndex] = { id: req.params.id, username, age, hobbies };
    res.status(200).send(users[userIndex]);
});

// DELETE user
router.delete('/:id', (req, res) => {
    if (!isUuid(req.params.id)) return res.status(400).send('Invalid UUID');

    const userIndex = users.findIndex(u => u.id == req.params.id);
    if (userIndex === -1) return res.status(404).send('User not found');

    users.splice(userIndex, 1);
    res.status(204).send();
});

export default router;
