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

// .env file (create this but don't commit to repo)
PORT=5000
DB_NAME=image_gallery
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=your-rds-endpoint.rds.amazonaws.com
JWT_SECRET=your_jwt_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-s3-bucket-name