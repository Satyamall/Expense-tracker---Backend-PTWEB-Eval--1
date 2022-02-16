


const express=require("express");
const app =express();
const cors= require('cors');
const connect = require('./config/db');
const employeesRouter = require('./routes/employees.route');
const expensesRouter = require('./routes/expenses.route');

const PORT=3000;

//cors
app.use(cors());
app.use(express.json())

app.use("/employees", employeesRouter);
app.use("/expenses", expensesRouter);

const start= async ()=>{
    await connect();
    app.listen(PORT,()=>{
        console.log(`app is listening on port ${PORT}`);
    })
}

module.exports=start;