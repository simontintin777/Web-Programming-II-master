const showRoutes = require("./televisionShow");
const path = require('path');

const constructorMethod = (app) => {

    app.use("/", showRoutes);

    app.use("*", (req, res) => {
        let route = path.resolve(`static/404.html`);
        res.sendFile(route);
    })
};

module.exports = constructorMethod;