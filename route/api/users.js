const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// @route  POST/api/users
//@desc    Register user
//@access  Public
router.post('/register', async (req, res) => {
  // See if user exist
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ errors: { msg: 'User is already registered' } });
    }
    user = new User({
      name,
      email,
      password,
    });
    // // hashing the password

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    // // Returning the jwt token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err);
  }
});
// @route GET/api/users/current
//@desc Get current user profile
//@access PRIVATE
router.get('/current/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ msg: 'there is no user for this user' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json('Server Error');
  }
});
// Add Picture

router.post('/update_user', auth, async (req, res) => {
  let obj = req.body;
  if (obj._id) delete obj._id;
  try {
    await User.findByIdAndUpdate(req.user.id, obj);
    res.status(200).send('success');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/vcf/:id', async (req, res) => {
  let { id } = req.params;
  try {
    const user = await User.findById(id);
    var vCardsJS = require('vcards-js');
    var vCard = vCardsJS();

    if (user._id) vCard.uid = user._id;
    if (user.name) vCard.firstName = user.name;
    if (user.avatarUrl) vCard.photo.attachFromUrl(user.avatarUrl, 'JPG');
    if (user.email) vCard.email = user.email;
    if (user.social.address) vCard.homeAddress.city = user.social.address;
    if (user.social.phone) vCard.cellPhone = user.social.phone;

    Object.keys(user.social).map((social) => {
      if (
        social !== 'address' &&
        social !== 'link' &&
        social !== 's_email' &&
        social !== 'website' &&
        social !== 'phone' &&
        social !== 'whatsapp'
      ) {
        if (social !== '')
          vCard.socialUrls[
            social
          ] = `https://www.${social}.com/${user.social[social]}`;
      }
    });

    vCard.saveToFile('./public/vcf.vcf');

    res.download('./public/vcf.vcf');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// router.post("/add_pic", auth, async (req, res) => {
//   let picture = req.body;
//   try {
//     await User.findByIdAndUpdate(req.user.id, picture);
//     res.status(200).send("success");
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// });
// // Add bio
// router.post("/add_bio", auth, async (req, res) => {
//   let bio = req.body;
//   try {
//     await User.findByIdAndUpdate(req.user.id, bio);
//     res.status(200).send("success");
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// });
// // Add Social
// router.post("/add_social", auth, async (req, res) => {
//   let social = req.body;

//   try {
//     await User.findByIdAndUpdate(req.user.id, { social });
//     res.status(200).send("success");
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
