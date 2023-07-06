const express = require("express")
const morgan = require("morgan")
const app = express()
const appsRouter = require("./routes/apps.router")
require("dotenv").config()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1/apps", appsRouter)


const PORT = process.env.PORT || 3000




app.listen(PORT, () => {
  console.log(`Server Running On : http://localhost:${PORT}`)
})