const express = require('express');
const { User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.userData.id;
    
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email']
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

module.exports = router;

