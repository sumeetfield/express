const bcrypt = require('bcrypt');
const User = require("../models/user");
const mangoose = require("mongoose");
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');



const createUser = async (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: req.body
            })
        } else {
            const user = new User();
            user.id = new mangoose.Types.ObjectId;
            user.username = req.body.username;
            user.password = hash;
            user.phone = req.body.phone;
            user.email = req.body.email;
            user.userType = req.body.userType;
            user.caste=req.body.caste;
            user.gender= req.body.gender;
            user.occupation=req.body.occupation;
            var userData = new User(user);
            userData.save()
                .then(result => {
                    res.status(200).json({ user: result });
                })
                .catch(err => {
                    res.status(500).json({
                        error: user
                    });
                });
        }
    });
}

const loginUser = async (req, res) => {
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<0){
            return res.status(401).json({
                msg: 'No User Found'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
                return res.status(401).json({
                    msg: 'Incorrect Username or Password'
                });
            }
            if(result){
                const token = jwt.sign({
                    username :user[0].username,
                    phone : user[0].phone,
                    email : user[0].email,
                    userType : user[0].userType,
                },
                'sumeetfield'
                ,{
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    username :user[0].username,
                    phone : user[0].phone,
                    email : user[0].email,
                    userType : user[0].userType,
                    token:token
                });
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: 'login failed'
        });
    })
}

const matchUser = async (req, res) => {
    // Extract the user's preferences from the request body
    const { age, gender, religion, caste, subcaste, education, occupation, income, location, interests } = req.body.preferences
  
    // Find users who match the preferences
    const matches = await User.find({
      age: { $gte: age.min, $lte: age.max },
      gender: gender,
      religion: religion,
      caste: caste,
      subcaste: subcaste,
      education: education,
      occupation: occupation,
      income: { $gte: income.min, $lte: income.max },
      'location.country': location.country,
      'location.state': location.state,
      'location.city': location.city,
      interests: { $in: interests }
    }).exec()
  
    // If no matches are found, return an error
    if (matches.length < 1) {
      return res.status(404).json({
        msg: 'No matches found'
      })
    }
  
    // Return the list of matches
    return res.status(200).json(matches)
  }
  


module.exports = { createUser, loginUser,matchUser };