const router = require("express").Router();
const { routes } = require("../app");
const expense = require("../controllers/expense.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/", expense.createExpense);
router.get("/", expense.getExpenses);
router.put("/:id", expense.updateExpense);
router.delete("/:id", expense.deleteExpense);

module.exports = router;