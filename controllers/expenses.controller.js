

const { validationResult } = require("express-validator");

const Expenses = require("../models/expenses.model");


const createExpense = async (req,res)=>{
    try{

        // *Validate
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
           return res.status(400).json({errors: errors.array()})
        }
        
        // *Create Expenses
        const doesEmployeeIDExist= await Expenses.findOne({employee_id: req.body.employee_id})
        if(doesEmployeeIDExist) return res.status(400).json({msg: "Duplicate Employee_ID found"})
        const expense = await Expenses.create({
            type: req.body.type,
            date_of_expense: req.body.date_of_expense,
            employee_id: req.body.employee_id,
            reimbursed: req.body.reimbursed,
            reimbursed_date: req.body.reimbursed_date
        })

        if(!expense) return res.status(400).json({msg: "No Expense Created"})
        return res.status(200).json(expense);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const getExpenses = async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;

        const expenses = await Expenses.find().skip(skip).limit(per_page);
        if(!expenses) return res.status(400).json({msg: "No Expenses found"})
        return res.status(200).json(expenses);
    }
    catch(err){
       return res.status(400).json({msg: "Something went wrong!"})
    }
}

const getExpensesByDate = async (req,res)=>{
    try{
        const date1 = req.query.date1 ;
        const date2 = req.query.date2;
        console.log(date1,date2);
        const total = await Expenses.find({date_of_expense: {$gte: (date1), $lte: (date2) }}).sort({date_of_expense: req.params.sort});
        if(!total) return res.status(400).json({msg: "No Tweets found"})
        res.status(200).json(total);
    }
    catch(err){
       return res.status(400).json({msg: "Something went wrong!"})
    }

}

const getGroupedExpenses = async (req,res)=>{

    try{
        const expenses = await Expenses.aggregate([
            {
              $match: {}
            },
            {
              $group: {
                _id : { type : "$type" }, counts: { $sum: 1}
              }
            }, { $sort :  { counts : req.params.sort}}
          ]);

        console.log("Expenses",expenses);

        if(!expenses) return res.status(400).json({msg: "No Expenses found"})

        res.status(200).json(expenses);
    }
    catch(err){
       return res.status(400).json({msg: "Something went wrong!"})
    }
}

const getExpensesByEmployeeid = async (req,res)=>{
    try{
        const expenses = await Expenses.find({employee_id: req.params.employee_id});
        if(!expenses) return res.status(400).json({msg: "No Expenses found"})
        res.status(200).json(expenses);
    }
    catch(err){
       return res.status(400).json({msg: "Something went wrong!"})
    }
}

const getExpensesById = async (req,res)=>{
    try{
        const expenses = await Expenses.find({_id: req.params.id});
        if(!expenses) return res.status(400).json({msg: "No Expenses found"})
        res.status(200).json(expenses);
    }
    catch(err){
       return res.status(400).json({msg: "Something went wrong!"})
    }

}

const getExpensesReimbursedAvg = async (req,res)=>{
    try{
        const expenses = await Expenses.aggregate([{$match: {}},{$group: { _id: "$reimbursed_date",average: {$avg: "$reimbursed_date"}}}]);
        if(!expenses) return res.status(400).json({msg: "No Expenses found"})
        res.status(200).json(expenses);
    }
    catch(err){
       return res.status(400).json({msg: "Something went wrong!"})
    }
}


module.exports = {
    getExpenses,
    getExpensesById,
    getExpensesByEmployeeid,
    getExpensesByDate,
   createExpense,
   getGroupedExpenses,
   getExpensesReimbursedAvg
};