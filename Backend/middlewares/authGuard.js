const User = require("../models/User")
const jwt= require("jsonwebtoken")
const jwtSecret= process.env.JWT_SECRET

const authGuard = async(req, res, next) => {
      const authHeader = req.headers ["Authorization"]
      const token = authHeader && authHeader.split("")[1];

      // checa se o cabeçalho tem o token 

      if(!token) return res.status(401).json({errors:["Acesso Negado"]})
        
      // verifica se o token é válido
      try{
        const verified = jwt.verify(token, jwtSecret)
        req.user= await User.findById( verified.id).select("-password");
        next();

      } catch(error){
        return res.status(401).json({errors:["Token Inválido"]})
      }





}

   module.exports = authGuard