import cluster from 'cluster';
import os from 'os';
import express from 'express';
import userRoutes from './routes/users.js';

const PORT = process.env.PORT || 4000;
const numCPUs = os.cpus().length - 1;

if (cluster.isPrimary) {
    console.log(`Primary process is running on port ${PORT}`);
    
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork({ PORT: PORT + i + 1});
    }

    let currentWorker = 0;

    const loadBalancer = express();

    loadBalancer.use((req, res) => {
        const workerPort = PORT + (currentWorker % numCPUs) + 1;
        currentWorker++;

        const targetUrl = `http://localhost:${workerPort}${req.originalUrl}`;
        res.redirect(targetUrl);
    });

    loadBalancer.listen(PORT, () => {
        console.log(`Load balancer running on port ${PORT}`);
    });

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} exited`);
        cluster.fork();
    });
} else {
    const app = express();
    app.use(express.json());
    app.use('/api/users', userRoutes);
  
    app.listen(process.env.PORT, () => {
        console.log(`Worker listening on port ${process.env.PORT}`);
    });
}