const {User} = require('../models/user');
const bcrypt = require("bcrypt");
const {mongoose} = require('../database/mongoose');
const jwt = require("jsonwebtoken");

exports.get_all_users  = (req, res, next) => {
    // res.send('respond with a resource');
    User.find().then((user)=>{
      res.status(200).json({
        userfound: user
      });
    }, (error) => {
        res.status(400).send(err);
    });

  }

exports.sign_up_user = (req, res, next) => {

  User.find({email: req.body.email})
  .exec()
  .then( user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'email already exist'
      })
    }
    else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error:err
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash
          }); 
          user.save().then( result => {
            console.log(result);
            res.status(201).json({
              message: 'User Created'
            })
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              error:err
            });
          });
        } 
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
}


exports.user_login  = (req, res, next) => { 
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    } 
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      if (result) {
        const token = jwt.sign({email: user[0].email,
        userId: user[0]._id}, 'secretkey213$', {expiresIn: "1h"}
        );
        return res.status(200).json({
          message: 'Auth successful',
          token: token
        });
      }
    }); 
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
}


exports.delete_user = (req, res, next) => {
  // console.log('iddd', req.params.userId);
  User.findByIdAndRemove(req.params.userId)
  .exec()
  .then( result => {
    res.status(200).json({
      message: 'user deleted'
    })
  })
  .catch( err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
}