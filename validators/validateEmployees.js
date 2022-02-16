
const {body} = require('express-validator');

const validateEmployees = ()=>([
  body("employee_id")
    .not()
    .isEmpty()
    .withMessage("Employee ID should not be empty!")
    .isLength({min: 1})
    .withMessage("Employee ID should at least have 1 characters!")
    .isString()
    .withMessage("Employee ID should be a string!")
    ,
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name should not be empty!")
    .isLength({min: 3})
    .withMessage("Name should at least have 3 characters!")
    .isString()
    .withMessage("Name should be a string!")
    ,
 body("gender")
   .not().isEmpty().withMessage("Gender should not be empty!")
   .isString().withMessage("Gender should be a string")
  ]
)

module.exports = validateEmployees;
