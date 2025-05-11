const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const imageRoutes = require('./routes/images');
const userRoutes = require('./routes/users');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
  credentials: true // Allow cookies to be sent
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Image Gallery API is running');
});

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
