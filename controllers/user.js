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


module.exports = { createUser, loginUser };