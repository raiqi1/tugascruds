const connection = require("../../config/mysql");
const path = require("path");
const fs = require("fs");
const Product = require('./model');
const sequelize = require("../../config/sequelize");

const index = async(req, res)=>{
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const details = async(req, res)=>{
    try {
        const response = await Product.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const  deleteProduct = async(req, res)=>{
    const product = await Product.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Data Found"});

    try {
        await Product.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Product Deleted Successfully"});
    } catch (error) {
        console.log(error.message);
    }
}


const store = async(req,res) => {
    const {users_id,name,price,stock,status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname,'../../uploads',image.originalname);
        fs.renameSync(image.path,target);
        try {
            await Product.sync()
            const result = await Product.create({
                users_id,
                name,
                price,
                stock,
                status,
                image_url:`http://localhost:3000/public/${image.originalname}`
        });
        res.send(result);
        } catch (e) {
            res.send(e);
        }
    }
}
   
const updateProduct = async(req,res) => {
    const product = await Product.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Data Found"});
    const{users_id,id,name,price,stock,status} = req.body;
    try {
        const response = await Product.update({users_id,id,name,price,stock,status},{
            where:{
                id: req.params.id
            }
        })
        console.log(response)
        res.send(response);
    } catch (error) {
       res.send(error);
    }
    
}


const _response = (res) => {
    return (error,result) => {
        if(error){
            res.send({
                status:'failed',
                response:'failed to fetch data'
            })
        }else{
            res.send({
                status:'success',
                response:result
            })
        }
    }
}

module.exports = {
    index,
    details,
    store,
    updateProduct,
    deleteProduct
}