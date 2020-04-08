const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avatarUrl: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
  },
  social:
    {
      instagram: {
        type: String,
      },
      venmo: {
        type: String,
      },
      snapchat: {
        type: String,
      },
      whatsapp: {
        type: String,
      },
      phone: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      youtube: {
        type: String,
      },
      pinterest: {
        type: String,
      },
      applemusic: {
        type: String,
      },
      spotify: {
        type: String,
      },
      paypal: {
        type: String,
      },
      soundcloud: {
        type: String,
      },
      website: {
        type: String,
      },
      link: {
        type: String,
      },
      s_email: {
        type: String,
      },
      address: {
        type: String,
      },
    },
  
});

module.exports = User = mongoose.model("user", UserSchema);
