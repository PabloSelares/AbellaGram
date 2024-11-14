const express = require('express');
const router = express.Router();

//controller
const { insertPhoto,deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto,likePhoto,commentPhoto, serachPhotos, } = require('../controllers/PhotoController');

//Middleware
const { photoInsertValidation, photoUpadateValidation,commentValidation } = require('../middlewares/photoValidation');
const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/handleValidation');
const { imageUpload } = require('../middlewares/imageUpload');

//Routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos)
router.get("/search", authGuard, serachPhotos,)
router.get("/:id", authGuard,getPhotoById)
router.put("/:id", authGuard,photoUpadateValidation(),validate,updatePhoto)
router.put("/:id", authGuard,likePhoto)
router.put("/comment/:id", authGuard,commentPhoto,validate,commentValidation(),)

module.exports = router;
