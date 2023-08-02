import  express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import env from "dotenv"
import compression from "compression"
import { errorHandler } from "./middlewares/filter.error.js"

const app = express()
env.config()

const PORT = process.env.PORT || 5000


app.use(compression({
    level : 6,
    threshold : 100 * 1000,
    filter : function (req,res){
        if(req.headers['x-no-compress']) return 

        return compression.filter(req,res)
    }
}))
app.use(cors())
app.use(bodyParser.json())





app.use(errorHandler)


app.listen(PORT,() => console.log("server is running" + " " + PORT))