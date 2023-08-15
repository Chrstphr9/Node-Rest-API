const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.get('/',(req,res)=> {
    res.send('hey its user route')
})
//Update User

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account Has Been Updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
});

//Delete User
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      
      try {
         await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account Has Been Deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json({ message: "You can delete only your acct" });
    }
  });

//Get A User
router.get("/:id", async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch(err) {
        res.status(500).json(err)
    }
})


//Follow A User

//Unfollow A User

// router.get('/', (req,res)=>{
//     res.send("This is the user route")
// })

module.exports = router;
