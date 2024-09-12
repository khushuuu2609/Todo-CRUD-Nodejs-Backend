import "dotenv/config"
import express from "express";
import dbcon from "./src/utils/dbConnection.js";
import todoRoutes from "./src/api/routes/todos.route.js";
import errorHandler from "./src/utils/errorHandler.js";

const port = process.env.PORT || 3000;

const app = express();


app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use("/todos",todoRoutes);

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server listning on ${port}`)
    dbcon()
});

