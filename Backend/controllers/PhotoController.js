const { constrainedMemory } = require("process");
const Photo = require("../models/photo");
const User = require("../models/User");
const mongoose = require("mongoose");

// Insert a photo, with a user related to it
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  try {
    const user = await User.findById(reqUser._id);

    // Create a new photo
    const newPhoto = await Photo.create({
      image,
      title,
      userId: user._id,
      userName: user.name,
    });

    // If photo was not created successfully
    if (!newPhoto) {
      return res.status(422).json({
        errors: ["Houve um erro, por favor tente mais tarde"],
      });
    }

    // Successfully created the photo
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: ["Erro ao inserir a foto, por favor tente mais tarde"],
    });
  }
};

// Remove a photo from DB
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    // Find the photo by ID
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    // Check if photo exists
    if (!photo) {
      return res.status(404).json({
        errors: ["Foto não encontrada"],
      });
    }

    // Check if the photo belongs to the user
    if (!photo.userId.equals(reqUser._id)) {
      return res.status(422).json({
        errors: ["Você não tem permissão para excluir esta foto"],
      });
    }

    // Delete the photo
    await Photo.findByIdAndDelete(photo._id);

    // Send success response
    res.status(200).json({
      message: "Foto excluída com sucesso",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: ["Erro ao excluir a foto, por favor tente mais tarde"],
    });
  }
};

//Get all  photos

const getAllPhotos = async (req, res) => {

    const photos = await Photo.find({}).sort([["createdAT", -1]])
    .exec();

   return res.status(200).json(photos);
  
};
// Get User Photos

const getUserPhotos = async (req, res) => {
  const { id } = req.params;

    const photos=  await Photo.find({userId: id}).sort([['createdAt', -1]])
    .exec();

return satus(200).json(photos);
}
// get photo by id

const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));
    
    // Check if photo exists
    if (!photo) {
      return res.status(404).json({
        errors: ["Foto não encontrada"],
      });
    }

    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({
      errors: ["Erro ao buscar foto"],
    });
  }
};

// Update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    if (!photo) {
      return res.status(404).json({
        errors: ["Foto não encontrada"],
      });
    }

    // Check if the photo belongs to the user
    if (!photo.userId.equals(reqUser._id)) {
      return res.status(422).json({
        errors: ["Você não tem permissão para editar esta foto"],
      });
    }

    // Update title if provided
    if (title) {
      photo.title = title;
    }

    await photo.save();
    res.status(200).json({ photo, message: "Foto atualizada com sucesso" });
  } catch (error) {
    res.status(500).json({
      errors: ["Erro ao atualizar foto"],
    });
  }
};

//Like Function

const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  const photo = await Photo.findById(id);
if (!photo) {
   res.status(404).json({
    errors: ["Foto não encontrada"],
  });
  return;
} 
// check if user already liked this photo
  if (photo.likes.includes(reqUser._id)) {
       res.status(422).json({
      errors: ["Você já curtiu esta foto"],
    });
    return;
  }
  //put user id in likes array
  photo.likes.push(reqUser._id);
  await photo.save();
  res.status(200).json({ photoId:id,userId:reqUser._id, message: "Foto curtida com sucesso" });
}

//coments functionality

const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;
  const user= await User.findById(reqUser._id);
  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({
      errors: ["Foto não encontrada"],
    });
    return;
  }

  // create new comment object
  const userComment = {
    userId: user._id,
    userName: user.name,
    userImage: user.profileImage,
    comment,
  };

  // add new comment to the photo comments array
  photo.comments.push(userComment);

  // save the photo
  await photo.save();

  res.status(200).json({ 
  comment:userComment, newComment, message: "Comentário adicionado com sucesso" });
};
//search photos by title
const serachPhotos = async(req,res) => {
  const {q}= req.query
  const photos = await Photo.findById({title: new RegExp(q, "i")}).exec();

  res.satus(200).json(photos)

  

}



module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  serachPhotos,

};
