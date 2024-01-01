const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 6500
const bodyParser = require("body-parser");

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB")
    .then(() => console.log("connected"))
    .catch((err) => console.log(err))

const userSchemea = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

const User = new mongoose.model("User", userSchemea)

app.get("/", (req, res) => {
    res.send("i am uttam kumar")
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const getEmail = await User.findOne({ email: email })
    if (getEmail) {
        if (password === getEmail.password) {
            res.send({ message: "login successfully", getEmail: getEmail })
        }
        else {
            res.send({ messsage: "password did not match" })
        }
    } else {
        res.send({ message: "user not registred" })
    }
})

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    const getEmail = await User.findOne({ email: email })
    if (getEmail) {
        res.send({ messsage: "user already" })
    } else {
        const user = new User({
            name,
            email,
            password,
        })
        user.save().then(() => { res.send({ message: "successfully registered" }) }).catch((error) => { res.send(error) })
    }

})

app.listen(PORT, () => {
    console.log(`port is running ${PORT}`)
})