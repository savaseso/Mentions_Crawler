const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/auth")


//getting mentions
router.get("/mentions", protect, async (req, res, next) => {
    
  });
  

  module.exports = router;