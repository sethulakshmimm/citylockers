require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Storage Booking API running');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };
