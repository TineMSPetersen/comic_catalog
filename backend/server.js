import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// App Config
const app = express();
const port = process.env.PORT || 4000;

app.use(cors())
app.use(express.json())

// API endpoints


app.get('/', (req, res) => {
  res.send("API is Working")
})

app.listen(port, () => console.log("Server started on Port : " + port));