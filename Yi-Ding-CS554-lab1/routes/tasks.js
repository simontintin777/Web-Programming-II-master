const express = require('express');
const router = express.Router();
const data = require("../data");
const taskData = data.tasks;
const commentsData = data.comments;

router.get("/", (req, res) => {
    taskData.getAllTasks().then((tasks) => {
        res.json(tasks);
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

router.get("/:id", (req, res) => {
    taskData.getTaskById(req.params.id).then((task) => {
        res.json(task);
    }, (error) => {
        // Not found!
        res.status(404).json({message: "not found!"});
    });
});

router.post("/", (req, res) => {
    let taskPostData = req.body;
    if(!taskPostData.title) {
        res.status(500).json("must provide all details of the new state of task");
    }
    else if(!taskPostData.description) {
        res.status(500).json("must provide all details of the new state of task");
    }
    else if(!taskPostData.hoursEstimated) {
        res.status(500).json("must provide all details of the new state of task");
    }
    else if(typeof taskPostData.completed !== 'boolean') {
        res.status(500).json("must provide all details of the new state of task");
    }
    else if(!taskPostData.comments) {
        res.status(500).json("must provide all details of the new state of task");
    }
    else {
        taskData.addTask(taskPostData.title, taskPostData.description,
            taskPostData.hoursEstimated,taskPostData.completed, taskPostData.comments)
               .then((newPost) => { 
                   console.log(newPost); 
                   res.json(newPost);
               }).catch((e) => {
                   res.status(500).json({ error: e });
        });
    }
});

router.put("/:id", (req, res) => {
    let updatedData = req.body;
    let gettask = taskData.getTaskById(req.params.id);
    if(!updatedData.title) {
        res.status(500).json("must provide all details of the new state of task");
    }
    else if(!updatedData.description) {
        res.status(500).json("must provide all details of the new state of task");
    }
    else if(!updatedData.hoursEstimated) {
        res.status(500).json("must provide all details of the new state of task");
    }
    else if(typeof updatedData.completed !== 'boolean') {
        res.status(500).json("must provide all details of the new state of task");
    }
    else if(updatedData.comments) {
        res.status(500).json("you cannot manipulate comments here");
    }
    else {
        gettask.then(() =>{
            return taskData.updateTask(req.params.id,updatedData)
                .then((updatedtask) => {
                    res.json(updatedtask);
                });
        }).catch((e) => {
            res.status(404).json({error:`task not found ${e}`})
        });
    }
});

router.patch("/:id",(req,res) => {
    
    let updatedData = req.body;
    if(updatedData.comments) {
        res.status(500).json("you cannot manipulate comments here");
    }
    else {
        let gettask = taskData.getTaskById(req.params.id);
        gettask.then(() =>{
            return taskData.updateTask(req.params.id,updatedData)
                .then((updatedtask) => {
                    res.json(updatedtask);
                }).catch((e) => {
                    res.status(500).json({error:e});
                });
        }).catch(() => {
            res.status(404).json({error:"task not found"})
        });
    }
});


// router.post("/:id/comments", (req, res) => {
//     let comment = req.body;
//     commentsData.addComment(comment.name, comment.comment, req.params.id)
//         .then((newComment) => {
//             res.json(newComment);
//         }).cathch((e) => {
//             res.status(500).json({ error: e });
//         });
// });

router.post("/:id/comments", (req, res) => {
    let commentData = req.body;
    commentsData.addComment(commentData.name, commentData.comment, req.params.id)
        .then((newPost) => {
            res.json(newPost);
        })
});

router.delete("/:taskId/:commentId", (req, res) => {
    return commentsData.removeComment(req.params.commentId)
        .then(() => {
            res.sendStatus(200);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

module.exports = router;