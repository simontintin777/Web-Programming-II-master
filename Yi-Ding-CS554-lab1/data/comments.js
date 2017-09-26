const mongoCollections = require("../config/mongoCollections");
const comments = mongoCollections.comments;
const tasks = mongoCollections.tasks;
const task = require("./tasks");

const uuid = require('node-uuid');

let exportedMethods = {
    getAllComments() {
        return comments().then((commentCollection) => {
            return commentCollection.find({}).toArray();
        })
    },
    getCommentById(id) {
        return tasks().then((taskDataCollection) => {
            return taskDataCollection.findOne({ "comments.id": id }).then((task) => {
                if (!task) throw "Comment not found";
                for (a in task.comments){
                    if(task.comments[a].id == id) {
                        return task.comments[a];
                    }
                }
            });
        });
    },
    // addComment(name, comment, taskId) {
    //     let newComment = {
    //         id:uuid.v4(),
    //         name:name,
    //         comment:comment
    //     };
    //     return tasks().then((taskDataCollection) => {
            
                    
    //                  return taskDataCollection.updata({_id: taskId},{ $addToSet: { "comments": newComment }}).then((result) => {
    //                     return task.getTaskById(taskId);
    //                 });
    //             //     return commentCollection.insertOne(newComment).then((newInsertInformation) => {
    //             //         return newInsertInformation.insertedId;
    //             //     }).then((newId) => {
    //             //         return this.getCommentById(newId);
                   
    //             // });
    //     });
    // },

        addComment(name,comment,taskId) {
            return tasks().then((tasksCollection) => {
                let newComment = {
                    id:uuid.v4(),
                    name:name,
                    comment:comment
                };
                return tasksCollection.update({_id:taskId},{ $addToSet: { "comments": newComment }}).then((result) => {
                    return task.getTaskById(taskId);
                });
        });
    },
    // removeComment(id) {
    //     // return comments().then((commentCollection) => {
    //         return tasks().then((taskDataCollection) => {
    //             return this.getCommentById(id).then((comment) =>{
    //                 return taskDataCollection.update({"comments.id":id},{$pull:{"comments":comment} });
    //             });
           
            // return commentCollection.removeOne({ _id: id }).then((deletionInfo) => {
            //     if (deletionInfo.deletedCount === 0) {
            //         throw (`Could not delete comment with id of ${id}`)
            //     } else {}
            // });
        // });
        removeComment(commentId) {
            return tasks().then((commentsCollection) => {
                exportedMethods.getCommentById(commentId).then((comment) =>{
                    return commentsCollection.update({"comments.id":commentId},{$pull:{"comments":comment} });
                });
            });
        }
    // updatePost(id, title, body, posterId) {
    //     return posts().then((postCollection) => {
    //         return users.getUserById(posterId)
    //             .then((userThatPosted) => {
    //                 let updatedPost = {
    //                     title: title,
    //                     body: body,
    //                     poster: {
    //                         id: posterId,
    //                         name: userThatPosted.name
    //                     }
    //                 };

    //                 return postCollection.updateOne({ _id: id }, updatedPost).then((result) => {
    //                     return this.getPostById(id);
    //                 });
    //             });
    //     });
    // }
}

module.exports = exportedMethods;