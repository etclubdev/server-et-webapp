import express from 'express';

import healthRoute from './routes/healthRoute';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('THIS IS A TEST');
});

app.use('/health', healthRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});