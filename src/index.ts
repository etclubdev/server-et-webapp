import express from 'express';

import healthRoute from './routes/healthRoute';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', healthRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});