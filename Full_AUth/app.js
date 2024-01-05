import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
const port = process.env.PORT || 5000

// CORS Policy
app.use(cors())
// JSON
app.use(express.json())

// Load Routes
app.use("/api/user", userRoutes)

const Start = async (req , res , next)=>
{
  try {
    await connectDB(process.env.DATABASE_URL)
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`)
    })
  } catch (error) {
    console.log('error: ', error);
    
  }
 
}

Start()