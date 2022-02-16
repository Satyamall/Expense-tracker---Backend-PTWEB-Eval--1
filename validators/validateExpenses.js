

const {body} = require('express-validator');

const validateExpenses = ()=>([
body("type")
    .not()
    .isEmpty()
    .withMessage("Type should not be empty!")
    .isLength({min: 3})
    .withMessage("Type should at least have 3 characters!")
    .isString()
    .withMessage("type should be a string!")
    ,
 body("date_of_expense")
   .not().isEmpty().withMessage("Date should not be empty!")
   .isLength({min: 1})
   .withMessage("Date should at least have 1 characters!")
   .isNumeric().withMessage("Date should be a Date"),
body("employee_id")
   .not().isEmpty().withMessage("Employee ID should not be empty!")
   .isString().withMessage("Employee ID should be array"),
body("reimbursed")
   .not().isEmpty().withMessage("Reimbursed should not be empty!")
   .isLength({min: 1})
   .withMessage("Reimbursed should be atleast have 1 characters!")
   .isBoolean().withMessage("Reimbursed should be in Boolean!"),
body("reimbursed_date")
   .not().isEmpty().withMessage("Date should not be empty!")
   .isLength({min: 1})
   .withMessage("Date should at least have 1 characters!")
   .isNumeric().withMessage("Date should be a Date")
  ]
)

module.exports = validateExpenses;
