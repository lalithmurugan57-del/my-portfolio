require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Profile = require('./models/Profile');

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB இணைப்பு
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Database Connected Successfully!'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// 1. Profile தரவை எடுக்க (GET)
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile data not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Profile தரவைச் சேமிக்க / புதுப்பிக்க (POST)
app.post('/api/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true });
    } else {
      profile = new Profile(req.body);
      await profile.save();
    }
    res.status(200).json({ message: 'Profile saved successfully!', profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Server running on port ${PORT}`));