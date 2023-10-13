const express = require("express")
const cors = require('cors');
const dataRoutes = require('./router/routes');
const app = express()
const port = 3020;
app.use(cors())
app.use(express.json());


app.use('/api', dataRoutes);

app.listen(port , ()=>{
    console.log(`server is running on localhost:${port}`)
})