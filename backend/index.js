const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

const FRONTEND_URL = process.env.FRONTEND_URL;
if (FRONTEND_URL) {
  app.use(cors({ origin: FRONTEND_URL, credentials: true }));
} else {
  app.use(cors()); // allow all in dev
}
app.use(express.json());

// PostgreSQL connection
const sequelize = new Sequelize(
  process.env.POSTGRES_DB || 'appsight',
  process.env.POSTGRES_USER || 'postgres',
  process.env.POSTGRES_PASSWORD || '1234',
  {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
  }
);

sequelize.authenticate()
  .catch((err) => console.error('PostgreSQL connection error:', err));

// Models
const User = require('./models/User')(sequelize);
const LandmarkType = require('./models/LandmarkType')(sequelize);
const LandmarkInfo = require('./models/LandmarkInfo')(sequelize);
const ContactPerson = require('./models/ContactPerson')(sequelize);
const TouristInfo = require('./models/TouristInfo')(sequelize);
const TouristCount = require('./models/TouristCount')(sequelize);

// Sync models with database
const fs = require('fs');
const SYNC_FLAG = './.db_synced';

sequelize.sync()
  .then(() => {
    if (!fs.existsSync(SYNC_FLAG)) {
      fs.writeFileSync(SYNC_FLAG, 'synced');
    }
  })
  .catch((err) => {
    if (fs.existsSync(SYNC_FLAG)) fs.unlinkSync(SYNC_FLAG);
  });

// Example route
app.get('/', (req, res) => {
  res.send('Appsight backend is running with PostgreSQL!');
});
// Nationality route removed (file does not exist)

// User routes
const userRouter = require('./routes/user')(User);
app.use('/api/users', userRouter);

// Landmark routes
const landmarkRouter = require('./routes/landmark');
app.use('/api', landmarkRouter);

// Tourist routes
const touristRouter = require('./routes/tourist');
app.use('/api/tourist', touristRouter);

const os = require('os');
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.listen(PORT, () => {});
