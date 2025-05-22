import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './products.js';

const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Routes
app.use('/api/products', productRoutes);

// Root route
app.get("/", (req, res) => {
  res.send('Home route');
});

// Test route
app.get('/test', (req, res) => {
  res.send('Test route response');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

