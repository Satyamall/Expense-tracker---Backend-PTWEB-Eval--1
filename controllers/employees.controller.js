

const {validationResult} = require('express-validator');

const Employees= require('../models/employees.model');


const getEmployees = async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;
        // (page - 1)*per_page
        const employees = await Employees.find().skip(skip).limit(per_page);

        if(!employees) return res.status(400).json({msg: "No Employees found"}) 
        return res.status(200).json(employees);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}


const getEmployeeById = async (req,res)=>{
    try{
        const employee = await Employees.findOne({_id: req.params.id});
        if(!employee) return res.status(400).json({msg: "Employee not found"})        
        return res.status(200).json(employee);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const getTotalEmployees= async (req,res)=>{
    try{
        const total = await Employees.find({}).count();
        if(!total) return res.status(400).json({msg: "No Employees found"})
        res.status(200).json(total);
    }
    catch(err){
       return res.status(400).json({msg: "Something went wrong!"})
    }

}

const createEmployee = async (req,res)=>{
    try{
        console.log(req.file);
        // * Validate
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        // * Create User
        const doesEmployeeExist= await Employees.findOne({employee_id: req.body.employee_id})
        if(doesEmployeeExist) return res.status(400).json({msg: "Duplicate Employee ID found"})
        const employee = await Employees.create({
            employee_id: req.body.employee_id,
            name: req.body.name,
            gender: req.body.gender
        })

        if(!employee) return res.status(400).json({msg: "Employee not created"})

        //200 ok
        return res.status(200).json(employee)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}



module.exports = {
   getEmployees,
   getEmployeeById,
   getTotalEmployees,
   createEmployee
};
