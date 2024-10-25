const db = require("../db/db")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const Signup = async (req,res) => {
    try {
    const {name,email,password,role} = req.body
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds); 
    const hashedPassword = await bcrypt.hash(password, salt);
        

    if(!name, !email ,!password, !role) {
        res.status(400).json({
            message:"field is missing"
        })
    }

    const user = await db.user.create({
        name:name,
        email:email,
        password:hashedPassword,
        role:role
    })

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
        expiresIn: '1d',
        });

    return res.json({
        data:user,
        token:token,
        message:"user signup successful"
    })


} catch(error) {
    console.log(error)
    if(error instanceof db.Sequelize.UniqueConstraintError) {
        return res.status(409).json({message:"email already exist"})
    }
    return res.status(400).json({
        error:error
    })
}
}

const Login = async (req,res) => {
    const { user } = req.query;
    console.log( "adadfsdsf" ,user)
    try {
    const {email,password} = req.body
    if(!email) {
        return res.status(400).json({
            message:"email not found"
        })
    }

    const user = await db.user.findOne({
        where:{
            email:email
        }
    })

    if(!user) {
    return    res.status(400).json({message:"user not found"})
    }

    const passworddd = await bcrypt.compare(password, user.password)

    if(!passworddd) {
       return res.json({message:"password not mathced"})
    }

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
        expiresIn: '1d',
        });

    return res.json({
        data:user,
        token:token
    })
}catch(error) {
    res.json({error:error})
}
}

const UserById = async (req,res) => {
    try {
    const userId = req.userId
    const user = await db.user.findOne({
        where:{
            id:userId
        }
    })
    if(!user) {
        return    res.status(400).json({message:"user not found"})
        }
        res.status(200).json({data:user})
}
catch(error) {
    res.status(400).json({error:error})
}
}

module.exports= {Signup, Login, UserById}