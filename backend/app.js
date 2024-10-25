require('../backend/src/db/db')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const authRoutes = require('./src/routes/auth_routes')
const productRoutes = require('./src/routes/product_routes')

app.use(cors())
app.use(bodyParser.json())


app.get('/' , (req,res)=>{
    res.send("welcome to my app")
})

app.use('/auth' , authRoutes)
app.use('/product', productRoutes)


app.use((req,res,next)=>{
    let error = {}
    error.status = 400
    error.message = "api not found"
    next(error)
})

app.use((err,req,res,next) => {
    console.log(err)
    res.json({
        error:err
    })
})

app.listen(5050, () => {
    console.log("running on port 5050")
})