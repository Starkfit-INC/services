// server.js
import express from 'express';
import { getDoc } from '@junobuild/core-peer';
import { AnonymousIdentity } from '@dfinity/agent';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const satellite = {
  identity: new AnonymousIdentity(),
  id: process.env.SATELLITE_ID,
  container: true,
};

// Endpoint to fetch habit data by ID
app.get('/habits/:id', async (req, res) => {
  try {
    const habitId = req.params.id;
    const habitDoc = await getDoc({
      collection: 'habits',
      key: habitId,
      satellite,
    });
    res.json(habitDoc);
  } catch (error) {
    console.error('Error fetching habit data:', error);
    res.status(500).json({ error: 'Failed to fetch habit data' });
  }
});

// Endpoint to fetch fitness data by ID
app.get('/fitness/:id', async (req, res) => {
  try {
    const fitnessId = req.params.id;
    const fitnessDoc = await getDoc({
      collection: 'fitness_data',
      key: fitnessId,
      satellite,
    });
    res.json(fitnessDoc);
  } catch (error) {
    console.error('Error fetching fitness data:', error);
    res.status(500).json({ error: 'Failed to fetch fitness data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
