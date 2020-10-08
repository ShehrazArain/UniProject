const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Users = require('../../models/Users')
const db = require('../../config/db')
const jwt = require('jsonwebtoken')
const config = require('config')


// @route    GET api/users
// @desc     Test route
// @access   Public
router.post('/', [
  check('name', 'Name is require').not().isEmpty(),
  check('email', "Unique Email is require").isEmail(),
  check('password', "Password length is must 6 character").isLength({ min: 6 })
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }

  let { name, email, password } = req.body;
  try {
    const user = await Users.findOne({
      where: {
        email: email
      }
    })

    if (user) {
      res.status(400).json({ errors: [{ msg: "User already exist " }] });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const Adduser = await Users.create({
      name,
      email,
      password,
    })



    // Return JwtWebToken
    const userId = await Users.findOne({
      where: {
        email: email
      }
    })

    const payload = {
      user: {
        id: userId.id
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token })
      }
    );

  } catch (err) {
    console.log(err)
  }
})

module.exports = router;