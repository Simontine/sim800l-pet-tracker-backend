import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = 3000;
const pets = {};

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 🐕 Receive data from SIM800L
app.post('/api/pet', (req, res) => {
    const { petId, lat, lng } = req.body;
  
    if (!petId || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: 'Missing data' });
    }
  
    if (!pets[petId]) {
      pets[petId] = [];
    }
  
    pets[petId].push({
      lat,
      lng,
      time: new Date()
    });
  
    console.log('📡 Stored:', pets[petId]);
  
    res.json({ status: 'saved' });
  });

// ❤️ Health check
app.get('/api/pet/:id', (req, res) => {
    const petId = req.params.id;
    res.json(pets[petId] || []);
  });
  
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});