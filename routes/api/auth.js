const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const config = require("config")
const { check, validationResult } = require("express-validator")
const Users = require('../../models/Users');

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get("/", auth, async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.user.id
    }
  })
  res.send(user)
});


// @route    POST api/auth
// @desc     Authenticate user & get token (for login )
// @access   Public
router.post('/',
  [
    check('email', "Email is require").isEmail(),
    check('password', "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
      let user = await Users.findOne({
        where: {
          email: email
        }
      });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;

