const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectdb = async () => {
  try {
    await mongoose.connect(db || 'mongodb://127.0.0.1/blue', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
};

module.exports = connectdb;
