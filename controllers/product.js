const getAllProducts = async(req,res)=>{
  res.status(200).json({msg:"Products"});
};

const getAllProductsTesting = async(req,res)=>{
    res.status(200).json({msg:"Products Testing"});
  };


  module.exports = {getAllProducts,getAllProductsTesting};