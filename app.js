const express = require("express");
const app = express();

const PORT= process.env.port || 3000;

const product_routes = require("./routes/product");
const user_routes = require("./routes/user");
const connectDb =  require("./db/connect");
var bodyParser = require('body-parser');


app.get("/",(req,res)=>{
    res.send("Riste Wallah Live");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/products",product_routes);
app.use("/api/user",user_routes);

app.use((req,res,next)=>{
  res.status(404).json({
    error:'bad request'
  });
});

const start = async()=>{
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(PORT,()=>{
      console.log(`Riste Wallah Live on Port ${PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();