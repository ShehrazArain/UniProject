const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../../models/Users')
const Contact = require('../../models/Contacts')

// user: req.user.id
// @route   GET api/contact
// @desc    Get all users contact
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      where: {
        user: req.user.id
      }
    });
    res.json(contacts)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: "Server Error " })
  }
})


// @route   POST api/contact
// @desc    Add new contact
// @access  Private
router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, phone, type } = req.body;
  try {
    const newContacts = await Contact.create({
      name,
      email,
      phone,
      type,
      user: req.user.id
    })

    // const contacts = await newContacts.save();
    res.send(newContacts)

  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: "Server Error" })
  }
})


// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findByPk(req.params.id)
    if (!contact) return res.status(400).json({ msg: "Contact Not Found" })

    if (contact.user !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    contact = await Contact.update(contactFields, { where: { id: req.params.id } })
    // contact = await Contact.findByIdAndUpdate(req.params.id,
    //   { $set: contactFields },
    //   { new: true })
    contact = await Contact.findByPk(req.params.id)
    res.json(contact)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: "Server Error" })
  }
})


// @route   DELETE api/contacts
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findByPk(req.params.id)
    if (!contact) return res.status(400).json({ msg: "Contact Not Found" })

    if (contact.user !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    await Contact.destroy({ where: { id: req.params.id } });
    res.json({ msg: "Contact removed" })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: "Server Error" })
  }
})


module.exports = router;
