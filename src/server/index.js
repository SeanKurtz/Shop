const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/user');
const ItemRouter = require('./routes/ItemRouter');

const app = express();

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const MONGODB_URI = 'mongodb+srv://admin:passmesomepasscode@cluster0-mbedf.mongodb.net/test?retryWrites=true&w=majority';

app.use(express.static('dist'));
app.use('/api/items', ItemRouter);

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.json({
      success: false,
      message: 'Error: email must not be blank'
    });
  }
  if (!password) {
    return res.json({
      success: false,
      message: 'Error: password must not be blank'
    });
  }

  // Check if account already exists
  User.find({ email }, (err, previousUsers) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Error: Server error looking up users'
      });
    }
    if (previousUsers.length > 0) {
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
      return res.json({
        success: true,
        message: 'Signed up'
      });
    });
    return res.json({
      success: false,
      message: 'Error: failed signing up'
    });
  });
});

app.post('/api/login', (req, res, next) => {
  const { email, password } = req.body;
  console.log('Receiving request at /api/login');
  console.log(`email: ${email} password: ${password}`);
  User.find({ email }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error looking up users'
      });
    }
    if (previousUsers.length > 0) {
      // Only use first result. If more, problem verifying signup.
      const firstUserResult = previousUsers[0].toJSON();
      const passwordHash = firstUserResult.password;
      console.log(passwordHash);
      bcrypt.compare(password, passwordHash, (err, result) => {
        console.log(result);
        if (result) {
          return res.json({
            success: true,
            message: 'Success: logged in.'
          });
        }
        return res.json({
          success: false,
          message: 'Error: failed to log in.'
        });
      });
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
