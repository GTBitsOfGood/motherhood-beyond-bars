import express from 'express';
import cors from 'cors';

import { newItemRequestRouter } from './routes/newItemRequest';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use(newItemRequestRouter);

export default app;
