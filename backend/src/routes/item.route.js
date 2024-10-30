const express = require('express');
const multer = require('multer');
const router = express.Router();
const itemController = require("../controllers/item.controller");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File type not allowed!'));
    },
});

// Routes
router.get('/items/:supplierId', itemController.getItemsBySupplier);
router.get('/items', itemController.getItems);
router.post('/item', upload.array('itemImages'), itemController.createItem);

module.exports = router;
