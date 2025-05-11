const { Image } = require('../models');
const { s3 } = require('../config/aws');
const { v4: uuidv4 } = require('uuid');

exports.uploadImage = async (req, res) => {
  try {
    const { title, description, base64Image } = req.body;
    const userId = req.userData.id;
    
    // Convert base64 to buffer
    const buffer = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    
    // Generate unique key for S3
    const s3Key = `images/${userId}/${uuidv4()}`;
    
    // Upload to S3
    const uploadResult = await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: s3Key,
      Body: buffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    }).promise();
    
    // Create image record in database
    const image = await Image.create({
      title,
      description,
      s3Key,
      imageUrl: uploadResult.Location,
      UserId: userId
    });
    
    res.status(201).json({
      message: 'Image uploaded successfully',
      image
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};

exports.getImages = async (req, res) => {
  try {
    const userId = req.userData.id;
    
    // Get all images for the user
    const images = await Image.findAll({
      where: { UserId: userId },
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error: error.message });
  }
};

exports.getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userData.id;
    
    // Get specific image
    const image = await Image.findOne({
      where: { id, UserId: userId }
    });
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image', error: error.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.userData.id;
    
    // Find image
    const image = await Image.findOne({
      where: { id, UserId: userId }
    });
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    // Update image
    image.title = title || image.title;
    image.description = description || image.description;
    await image.save();
    
    res.status(200).json({
      message: 'Image updated successfully',
      image
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating image', error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userData.id;
    
    // Find image
    const image = await Image.findOne({
      where: { id, UserId: userId }
    });
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    // Delete from S3
    await s3.deleteObject({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: image.s3Key
    }).promise();
    
    // Delete from database
    await image.destroy();
    
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
};