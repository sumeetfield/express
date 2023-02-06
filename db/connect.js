const mongoose = require("mongoose");

const uri = "mongodb+srv://sumeetfield:F6xostSGsVKA4RgV@ristewallah.elfmulm.mongodb.net/Ristewallah?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);

const connectDb = ()=>{
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));
};

module.exports = connectDb;