const router = require("express").Router();
const dashboardRoutes = require("./dashboardRoutes");
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
// router.use((req, res) => {
//   res.status(404).end();
// });
module.exports = router;
