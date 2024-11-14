const express= require("express")
const router = express()

router.use("/api/users",require("./userRoutes"));
router.use("/api/photos",require("./PhotoRoutes"));

// teste route 

router.get('/', (req, res) => {
  res.send("API esta trabalhando")
})

module.exports = router
