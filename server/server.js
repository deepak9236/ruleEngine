import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config.js';
import ruleRoutes from './routes/ruleRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Database Connection
connectDB();

// API Routes

app.use('/api/rules', ruleRoutes);
// Enable CORS for all requests

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
