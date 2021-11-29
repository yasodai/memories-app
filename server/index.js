
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

app.use(express.json({limit:'30mb'}))
app.use(express.urlencoded({ limit: '30mb', extended: true}))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user',userRoutes)

app.get('/',(req, res) =>{
  res.send('Hello to Memories API')
})


const PORT = process.env.PORT || 5000

mongoose.connect( process.env.CONNECTION_URL)
.then(() => app.listen(PORT,() => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error) )














// const express = require('express')
// const cors = require('cors')

// const products = require('./products')

// const app=express()

// app.use(express.json())
// app.use(cors())

// app.get('/',(req,res)=>{
//   res.send('Welcome to our online shop API')
// })

// app.get('/products',(req,res)=>{
//   res.send(products)
// })

// const port = process.env.PORT || 5000

// app.listen(port ,()=>console.log(`Server running on port ${port}`))