const requestBodiesRoutes = require("./requestBodies");
const URLRequestTimesRoutes = require("./URLRequestTimes");

let constructorMethod = (app) => {
    app.use("/requestBodies", requestBodiesRoutes);
    app.use("/URLRequestTimes", URLRequestTimesRoutes);
};

module.exports = {
    requestBodies: requestBodiesRoutes,
    URLRequestTimes: URLRequestTimesRoutes
};