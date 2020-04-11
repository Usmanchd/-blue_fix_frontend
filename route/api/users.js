const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const nodemailer = require('nodemailer');

const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const SENDER_EMAIL_ADDRESS = 'usman.aslam0701@gmail.com';
const MAILING_SERVICE_CLIENT_ID =
  '90159869336-g3c7blrus3mca7t30a5kc3efbknmb1s5.apps.googleusercontent.com';
const MAILING_SERVICE_CLIENT_SECRET = '9_PkBHZ4-qJ7FI51Y78ULAGt';
const MAILING_SERVICE_REFRESH_TOKEN =
  '1//04RSPXiW4ZN7ACgYIARAAGAQSNwF-L9IrDA-5zRwUG4NxUnqo9YTAH0JdeRACGwYcJNCE-TeW3Q4Tzc9z54P9e8pcDLCRL0oPP5I';
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const Mailing = {};

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND
);

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

router.get('/reset/:email', async (req, res) => {
  const { email } = req.params;

  const code = Math.floor(Math.random() * 9000 + 999);

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { resetCode: code },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: 'there is no user for this email' });
    }

    // Mailing.sendEmail = (data) => {
    oauth2Client.setCredentials({
      refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    });
    // };

    const accessToken = oauth2Client.getAccessToken();

    // const accessToken =
    //   'ya29.a0Ae4lvC3fsyZl3Yk99bd4XzQ2fseXs9SP27DdoAv2hIhedNdtDq73emRI56uK9LK84zxQ9m21kXw0IFzd9Htc_AKjShhbhN7BOBaDLD7WHHnpwYXcRUmo9i1WV8y0QnHXnWSu1-hJTb6ZsGGoMwsTJmkpthhXja9jK6w';

    const smtpTransport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL_ADDRESS,
        pass: 'kj1fkyhs2345kk0880',
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from: SENDER_EMAIL_ADDRESS,
      to: user.email,
      subject: 'Reset Password✔',
      text: `Your Reset Code is ${code}`,
      html: `<h1>Your Reset Code is ${code}</h1>`,
    };

    await smtpTransport.sendMail(mailOptions);
    console.log(user);
    res.status(200).send('Check Your Email');
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/code_check', async (req, res) => {
  let code = req.body.code;
  let email = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (user.resetCode === code) res.status(200).send('success');
    else res.status(400).send({ msg: 'incorrect code' });
  } catch (err) {
    res.status(500).send({ msg: 'Server Error' });
  }
});

router.post('/reset_password', async (req, res) => {
  let password = req.body.password;
  let email = req.body.email;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate({ email }, { password: hashedpassword });

    res.status(200).send('success');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route GET/api/users/current
//@desc Get current user profile
//@access PRIVATE

// Update User
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

router.post('/update_clicks/:id', async (req, res) => {
  let obj = req.body;
  const id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(id, obj, { new: true });
    res.status(200).json(user);
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
    console.log(user);
    if (user._id) vCard.uid = user._id;
    if (user.name) vCard.firstName = user.name;
    if (user.avatarUrl) vCard.photo.attachFromUrl(user.avatarUrl, 'JPEG');
    if (user.email) vCard.email = user.email;
    if (user.social.address.value)
      vCard.homeAddress.city = user.social.address.value;
    if (user.social.phone.value) vCard.cellPhone = user.social.phone.value;
    vCard.url = `https://profileblue.herokuapp.com/profile/${user._id}`;
    vCard.workUrl = `https://www.instagram.com/${user.social['instagram']}`;

    Object.keys(user.social).map((social) => {
      if (
        social !== 'address' &&
        social !== 'link' &&
        social !== 's_email' &&
        social !== 'website' &&
        social !== 'phone' &&
        social !== 'whatsapp'
      ) {
        if (user.social[social].value !== '')
          vCard.socialUrls[
            social
          ] = `https://www.${social}.com/${user.social[social].value}`;
      }
    });

    vCard.saveToFile('./public/vcf.vcf');

    res.download('./public/vcf.vcf');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
