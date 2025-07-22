const express = require('express');
const router = express.Router();
const { TouristInfo, TouristCount } = require('../models');

// Create new tourist info and count
router.post('/', async (req, res) => {
  try {
    const {
      allocation,
      nationality,
      stay_duration,
      landmark_info,
      form_date,
      num_male,
      num_female,
      num_foreign_male,
      num_foreign_female
    } = req.body;

    // Insert into tourist_info
    const tourist = await require('../models').TouristInfo.create({
      allocation,
      nationality,
      stay_duration,
      landmark_info,
      form_date
    });

    // Insert into tourist_count
    await require('../models').TouristCount.create({
      tourist_info: tourist.info_id,
      num_male,
      num_female,
      num_foreign_male,
      num_foreign_female
    });

    res.status(201).json({ success: true, info_id: tourist.info_id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save tourist info', details: err.message });
  }
});

// Get all tourist info
router.get('/', async (req, res) => {
  try {
    const tourists = await TouristInfo.findAll({ include: [TouristCount] });
    res.json(tourists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
