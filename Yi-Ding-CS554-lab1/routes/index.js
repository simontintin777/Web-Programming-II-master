const taskRoutes = require("./tasks");
const middlewares = require("../middleware");

const constructorMethod = (app) => {
    app.use(middlewares.requestBodies.requestBodies);
    app.use(middlewares.URLRequestTimes.URLRequestTimes);
    app.use("/api/tasks", taskRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Not found"});
    });
};

module.exports = constructorMethod;