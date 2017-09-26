const taskData = require("./tasks");
const commentData = require("./comments");

let constructorMethod = (app) => {
    app.use("/comments", commentRoutes);
    app.use("/tasks", taskRoutes);
};

module.exports = {
    tasks: taskData,
    comments: commentData
};