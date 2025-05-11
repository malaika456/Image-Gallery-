const express = require('express');
const imageController = require('../controllers/images');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, imageController.uploadImage);
router.get('/', auth, imageController.getImages);
router.get('/:id', auth, imageController.getImage);
router.patch('/:id', auth, imageController.updateImage);
router.delete('/:id', auth, imageController.deleteImage);
