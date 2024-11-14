const { response } = require("express");
const User= require("../models/User");
//const bcrypt= require("bcryptsjs");
const jwt= require("jsonwebtoken");
const mongoose= require("mongoose");
const jwtSecret= process.env.JWT_SECRET;


//Gerando token 

const generateToken= (id)=>{
return jwt.sign({id}, jwtSecret, {
     expiresIn: "7d",
})

}

const register = async(req, res) => {
    const { name, email, password } = req.body;
   
     //checkando se o usuario existe
     const user= await User.findOne({ email})

     if(user){
         res.status(422).json({errors: [" Por favor utilize outro e-mail"]})
         return
     }

      // gerando senha
      const salt = await  bcrypt.genSalt()
      const passwordHash= await bcrypt.hash(password, salt)

      //criando Usuario
     const newUser= await User.create({name,email,password:passwordHash})
           
     //gerando token do usuario

     if(!newUser){
        res.status(422).json({errors:["Houve um erro, por favor tente mais tarde"]})
     }
       res.status(201).json({_id: newUser._id,
        token: generateToken(newUser._id),
      
       })

    };

    const login = async(req, res) => {
       const{email, password} = req.body
       const user= await User.findOne({email})
       
    //checar se user existe

    if(!user){
        res.status(404).json({errors: ["Usuario não encontrado"]})
        return
    }
      // checando se a senha bate 

      if(!await bcrypt.compare(password, user.password)){
          res.status(422).json({errors: ["Senha inválida"]})
          return
      }
      //retornando usuario com token 
      res.status(201).json({
        _id: user._id,
        profileIMage: user.profileIMage,
        token: generateToken(newUser._id),
      
       });
    };


    //Get current logged in user 

    const getCurrentUser = async(req, res) => {
        const user= req.user;

        res.status(200).json(user);
       
    };
    //update an user

    const update = async (req, res) => {
        const { name, password, bio } = req.body;
      
        let profileImage = null;
      
        if (req.file) {
          profileImage = req.file.filename;
        }
      

        const user = await User.findById(mongoose.Types.ObjectId(req.user._id)).select("-password");
      
        if (name) {
          user.name = name;
        }
        
        if (password) {
          const salt = await bcrypt.genSalt();
          const passwordHash = await bcrypt.hash(password, salt);
          user.password = passwordHash;
        }
        
        if (profileImage) {
          user.profileImage = profileImage;
        }
        
        if (bio) {
          user.bio = bio;
        }
      
        await user.save();
        res.status(200).json(user);
      };

      //Get user BY ID

      const getUserById = async (req, res) => {
        const {id} = req.params
        
        try{
            const user= await User.findById(mongoose.Types.ObjectId(id)).select("-password");
         //check if user exist
         if(!user){
            res.status(404).json({errors: ["Usuario não encontrado"]})
            return
        }
        res.status(200).json(user);
        
        
        
        } catch(err){
            res.status(404).json({ errors: ["Usuario não encontrado"]});
            return
        }
         
        
        
    
    }
      
      module.exports = {
        register,
        login,
        getCurrentUser,
        update,
        getUserById,
      };
      