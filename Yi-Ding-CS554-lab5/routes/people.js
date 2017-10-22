const express = require('express');
const router = express.Router();
const data = require("../data");
const peopleData = data.people;
const bluebird = require("bluebird");
const flat = require("flat");
const unflatten = flat.unflatten
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);



router.get("/history", async(req, res) => {
    let cache = await client.lrangeAsync('visitedPeople', 0, 19);
    res.send(cache);
});          



router.get("/:id", async(req, res) => {
    //await client.flushallAsync();
    let visited = await client.existsAsync(req.params.id);
    if(visited) {
        let p = await client.getAsync(req.params.id);
        await client.lpushAsync('visitedPeople', JSON.stringify(p));
        res.json(JSON.parse(p));
    } else {
        peopleData.getById(req.params.id).then(async(person) => {
            await client.setAsync(req.params.id, JSON.stringify(person));  
            await client.lpushAsync('visitedPeople', JSON.stringify(person)); 
            res.json(person);
        }).catch(() => {
            res.sendStatus(404);
        });
    }   
});



module.exports = router;