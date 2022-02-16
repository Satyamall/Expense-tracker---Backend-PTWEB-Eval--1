
const express = require("express");
const { createExpense, getExpenses, getExpensesById, getExpensesByEmployeeid, getExpensesByDate, getGroupedExpenses, getExpensesReimbursedAvg } = require("../controllers/expenses.controller");
const router = express.Router();



const validateExpenses = require("../validators/validateExpenses")


router.get("/", getExpenses);

router.get("/:id", getExpensesById);

router.get("/:employee_id", getExpensesByEmployeeid);

router.get("/date/:sort", getExpensesByDate);

router.get("/grouped/:sort",getGroupedExpenses);

router.get("/avg",getExpensesReimbursedAvg);

router.post("/", ...validateExpenses(),createExpense);

module.exports = router;