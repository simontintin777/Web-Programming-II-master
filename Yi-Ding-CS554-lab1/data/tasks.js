const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require('node-uuid');
const commentsData =  require("./comments");

let exportedMethods = {
    getAllTasks() {
        return tasks().then((taskCollection) => {
            return taskCollection.find({}).toArray();
        });
    },
    // This is a fun new syntax that was brought forth in ES6, where we can define
    // methods on an object with this shorthand!
    getTaskById(id) {
        return tasks().then((taskCollection) => {
            return taskCollection.findOne({ _id: id }).then((task) => {
                if (!task) throw "Task not found";
                return task;
            });
        });
    },
    addTask(title, description, hoursEstimated, completed, comments) {
        newComments = [];
        for( let i = 0; i < comments.length; i++) {           
            newComments[i] =  {
                id:uuid.v4(),
                name:comments[i].name,
                comment:comments[i].comment
            };
        }
        return tasks().then((taskCollection) => {
            let newTask = {
                title: title,
                description: description,
                hoursEstimated: hoursEstimated,
                completed: completed,
                comments: newComments,
                _id: uuid.v4()
            };

            return taskCollection.insertOne(newTask).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getTaskById(newId);
            });
        });
    },
    removeTask(id) {
        return tasks().then((taskCollection) => {
            return taskCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete task with id of ${id}`)
                }
            });
        });
    },
    updateTask(id, updatedtask) {
        return tasks().then((taskCollection) => {
            let updatetaskData = {};

            if (updatedtask.title) {
                updatetaskData.title = updatedtask.title;
            }

            if (updatedtask.description) {
                updatetaskData.description = updatedtask.description;
            }

            if (updatedtask.hoursEstimated) {
                updatetaskData.hoursEstimated = updatedtask.hoursEstimated;
            }

            
            updatetaskData.completed = updatedtask.completed;
            

            let updateCommand = {
                    $set: updatetaskData
            };

            return taskCollection.updateOne({_id:id},updateCommand).then((result) => {
                return this.getTaskById(id);
            });
        });
    },
}

module.exports = exportedMethods;