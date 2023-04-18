const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// GET USER INFORMATION
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json("Failed to get user ");
  }
});

// UPDATE USER INFORMATION
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json("Failed to update user");
    }
  }
  else {
    res.status(401).json("You can only update your own account!");
  }
});

// DELETE USER INFORMATION
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                // Delete all posts by user
                await Post.deleteMany({ username: user.username });
                // Delete user
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User and their posts has been deleted");
            } else {
                res.status(404).json("User not found");
            }
        } catch (error) {
            res.status(500).json("Failed to delete user");
        }
    } else {
        res.status(401).json("You can only delete your own account!");
    }
});

module.exports = router;
