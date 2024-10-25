const jwt = require('jsonwebtoken');
const db = require('../db/db');
 
 const verifyAdmin = async (req, res, next) => {
    try {
        const userId = req.userId

    const user = await db.user.findOne({
        where:{
            id:userId
        }
    })
    // console.log("user>>>>",user)
    if(!user) {
        return    res.status(400).json({message:"user not found"})
    }
    if(user.role!=="ADMIN") {
        return    res.status(400).json({message:"ONlY ADMIN CAN ACCESS"})
    }
    next();
    
} catch(error) {
    res.status(401).json({ error: 'ONlY ADMIN CAN ACCESS' });
}
}

module.exports = verifyAdmin
