import dotenv from 'dotenv';

dotenv.config();

import proxy from 'express-http-proxy';
import express from 'express';

const app = express();

app.use('*', proxy(process.env.PROXY_URL));

export default app;