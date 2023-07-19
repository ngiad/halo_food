import  express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import env from "dotenv"

const app = express()
env.config()

const PORT = process.env.PORT || 5000



app.use(cors())
app.use(bodyParser.json())



app.get("/" ,(req,res) => {
    res.send("lol")
})


app.listen(PORT,() => console.log("server is running" + " " + PORT))