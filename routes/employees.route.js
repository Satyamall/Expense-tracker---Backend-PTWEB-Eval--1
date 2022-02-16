

const express = require('express');
const { createEmployee, getEmployeeById, getTotalEmployees, getEmployees } = require('../controllers/employees.controller');
const router= express.Router();

const validateEmployees = require('../validators/validateEmployees');

router.get("/", getEmployees);

router.get("/total", getTotalEmployees);

router.get("/:id", getEmployeeById);

router.post("/", ...validateEmployees(),createEmployee);

module.exports = router;
