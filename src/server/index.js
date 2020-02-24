const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Item = require('./models/item');
const User = require('./models/user');

const app = express();

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const MONGODB_URI = 'mongodb+srv://admin:passmesomepasscode@cluster0-mbedf.mongodb.net/test?retryWrites=true&w=majority';

app.use(express.static('dist'));
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  });
  try {
    const savedItem = await item.save();
    res.json(savedItem);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

app.post('/api/signup', (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.json({ success: false, message: 'Error: email must not be blank' });
  }
  if (!password) {
    return res.json({ success: false, message: 'Error: password must not be blank' });
  }

  // Check if account already exists
  User.find({
    email
  }, (err, previousUsers) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Error: Server error looking up users'
      });
    } if (previousUsers.length > 0) {
      return res.json({
        success: false,
        message: 'Error: Account already exists'
      });
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Error: Server error looking up users'
        });
      }
      return res.send({
        success: true,
        message: 'Signed up'
      });
    });
  });
});

app.post('/api/login', (req, res, next) => {
  const { email, password } = req.body;
  User.find({
    email
  }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error looking up users'
      });
    } if (previousUsers.length > 0) { // We found a result, we only care about first result. If there are more results for one email, we have a problem with signup.
      const firstUserResult = previousUsers[0].toJSON();
      const passwordHash = firstUserResult.password;
      console.log(passwordHash);
      return bcrypt.compare(passwordHash, password);
    }
  });
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connection established');
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
