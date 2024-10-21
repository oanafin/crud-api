import express from "express";
import userRoutes from './routes/users.js';

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);

app.use((req, res) => {
    res.status(404).send('Requested resource not found');
});

app.get('/', (req, res) => {
    res.send('CRUD API is working');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error: Something went wrong');
});

app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
})

export default app;