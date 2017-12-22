const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");

app.use(bodyParser.json());

app.get("/api/people/:id", async (req, res) => {
    try{    
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "get-people-by-id",
            data: {
                message: req.params.id
            },
            expectsResponse: true
        });
        res.json(response);
    } catch(e) {
        res.json({ error: e.message });
    }
});

app.post("/api/people", async (req, res) => {
    try{
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "post-people",
            data: {
                message: req.body.people
            },
            expectsResponse: true
        });
    
        res.json({ response });
    } catch(e) {
        res.json({ error: e.message });
    }
    
});

app.delete("/api/people/:id", async (req, res) => {
    // if(req.params.id > 1000) {
    //     res.json("No such person!")
    // } else {
    try{
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "delete-people-by-id",
            data: {
                message: req.params.id
            },
            expectsResponse: true
        });
        res.json({ response });
        //res.json("We delete it!");
    //} 
    } catch(e) {
        res.json({ error: e.message });
    }
});

app.put("/api/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "put-people-by-id",
            data: {
                id: req.params.id,
                message: req.body.people
            },
            expectsResponse: true
        });

        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
})

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});