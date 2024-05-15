const express = require('express')
const app = express()
const mongoose = require("mongoose");
const port = 5050
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const dotenv = require('dotenv')
dotenv.config();
const cors = require("cors");
app.use(cors());

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    profileImg: String,
    balance: Number,
    role: String,
    basketItems: [],
    name: String
}, { timestamps: true })

const UserModel = mongoose.model("Users", userSchema)

const productSchema = new mongoose.Schema({
    name: String,
    salePrice: Number,
    costPrice: Number,
    createdAt: Date,
    imgSrc: String,
    discountPercentage: Number,
    description: String,
    categoryId: String,
    stockCount: Number
}, { timestamps: true })

const ProductModel = mongoose.model("Products", productSchema)

const categorySchema = new mongoose.Schema({
    name: String,
}, { timestamps: true })

const CategoryModel = mongoose.model("Categories", categorySchema)


const messageSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    title: String,
    message: String,
    isRead: Boolean
})
const MessageModel = mongoose.model("Messages", messageSchema)
//users
app.get('/api/users', async (req, res) => {
    let users
    users = await UserModel.find()
    res.send({
        message: "all data",
        data: users
    })
})
// getbyid
app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    let user
    user = await UserModel.findById(id)
    res.send({
        message: "findbyid data",
        data: user
    })
})
//post
app.post("/api/users", async (req, res) => {
    const user = new UserModel(req.body);
    await user.save();
    res.send({
        message: "posted",
        data: user,
    });
});
//delete
app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params
    let response
    try {
        response = await UserModel.findByIdAndDelete(id)
    }
    catch (error) {
        res.send({
            error: error
        })
    }
    res.send({
        message: "deleted",
        response: response
    })
})
//patch 
app.patch("/api/users/:id", async (req, res) => {
    const { id } = req.params
    await UserModel.findByIdAndUpdate(id, req.body)
    const pat = await UserModel.findById(id)
    res.send({
        message: 'patch',
        response: pat
    })
})

//products

//users
app.get('/api/products', async (req, res) => {
    let products
    products = await ProductModel.find()
    res.send({
        message: "all data",
        data: products
    })
})
// getbyid
app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    let product
    product = await ProductModel.findById(id)
    res.send({
        message: "findbyid data",
        data: product
    })
})
//post
app.post("/api/products", async (req, res) => {
    const product = new ProductModel(req.body);
    await product.save();
    res.send({
        message: "posted",
        data: product,
    });
});
//delete
app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params
    let response
    try {
        response = await ProductModel.findByIdAndDelete(id)
    }
    catch (error) {
        res.send({
            error: error
        })
    }
    res.send({
        message: "deleted",
        response: response
    })
})
//patch 
app.patch("/api/products/:id", async (req, res) => {
    const { id } = req.params
    await ProductModel.findByIdAndUpdate(id, req.body)
    const pat = await ProductModel.findById(id)
    res.send({
        message: 'patch',
        response: pat
    })
})

//categories
app.get('/api/categories', async (req, res) => {
    let categories
    categories = await CategoryModel.find()
    res.send({
        message: "all data",
        data: categories
    });
});
// getbyid
app.get('/api/categories/:id', async (req, res) => {
    const { id } = req.params;

    let category
    category = await CategoryModel.findById(id)
    res.send({
        message: "findbyid data",
        data: category
    });
});
//post
app.post("/api/categories", async (req, res) => {
    const category = new CategoryModel(req.body);
    await category.save();
    res.send({
        message: "posted",
        data: category,
    });
});
//delete
app.delete("/api/categories/:id", async (req, res) => {
    const { id } = req.params
    let response
    try {
        response = await CategoryModel.findByIdAndDelete(id)
    }
    catch (error) {
        res.send({
            error: error
        })
    }
    res.send({
        message: "deleted",
        response: response
    })
})
//patch 
app.patch("/api/categories/:id", async (req, res) => {
    const { id } = req.params
    await CategoryModel.findByIdAndUpdate(id, req.body)
    const pat = await CategoryModel.findById(id)
    res.send({
        message: 'patch',
        response: pat
    });
});

//messages
app.get("/api/messages", async (req, res) => {
    let messages
    messages = await MessageModel.find()
    res.send({
        message: "all data",
        data: messages
    });
});
//get by id
app.get("/api/messages/:id", async (req, res) => {
    const { id } = req.params
    let message
    message = await MessageModel.findById(id)
    res.send({
        message: "finded data",
        data: message
    });
});
//post
app.post("/api/messages", async (req, res) => {
    const message = new MessageModel(req.body);
    await message.save();   
    res.send({
        message: "posted",
        data: message,
    });
});
//delete
app.delete("/api/messages/:id", async (req, res) => {
    const { id } = req.params
    const response = await MessageModel.findByIdAndDelete(id)
    res.send({
        message: "deleted",
        response: response,
    })
})
//patch
app.patch("/api/messages/:id",async(req,res)=>{
    const {id}=req.params
     await MessageModel.findByIdAndUpdate(id)
    const updated= MessageModel.findById(id)
    res.send({
        message:"updated",
        response:updated
    })
})

mongoose.connect('mongodb+srv://Reiyna1o:Reiyna1234@e-commerse-app.neoxpkd.mongodb.net/')
    .then(() => console.log('Connected!'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})