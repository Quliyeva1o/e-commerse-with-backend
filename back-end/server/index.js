const express = require('express')
const app = express()
const mongoose = require("mongoose");
const port = 5050
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const dotenv = require('dotenv')
dotenv.config();

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


mongoose.connect('mongodb+srv://Reiyna1o:Reiyna123@cluster0.cglvful.mongodb.net/')
    .then(() => console.log('Connected!'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})