const redisConnection = require("./redis-connection");
const data = require("./data");
const peopleData = data.people;

const bluebird = require("bluebird");
const flat = require("flat");
const unflatten = flat.unflatten
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);



peopleData.getAllPeople().then((people) => {
    people.forEach(function (p) {
        //console.log(JSON.stringify(p));
        client.hsetAsync("dummy", p.id, JSON.stringify(p));
    });
}).catch((e) => {
    console.log(e);
});

redisConnection.on('get-people-by-id:request:*', async (message, channel) => {
    let peopleId = message.data.message;
    // console.log(peopleId);
    //let peopleExist = await client.existsAsync(peopleId);
    let person = await client.hgetAsync("dummy",peopleId);
    let requestId = message.requestId;
    let eventName = message.eventName;   
    let successEvent = `${eventName}:success:${requestId}`;
    if(person) {  
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: {
                person: JSON.parse(person)
            },
            eventName: eventName
        });
        // console.log(person);
        // console.log(typeof(person));
    } else {
        let failedEvent = `${eventName}:failed:${requestId}`;
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: {
                message: "No such person"
            },
            eventName: eventName
        });
        //console.log("Not found!");
    }
});

redisConnection.on('post-people:request:*', async (message, channel) => {
    let person = message.data.message;
    let peopleExist = await client.existsAsync("dummy",person.id);
    let requestId = message.requestId;
    let eventName = message.eventName;
    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;
    
    if(peopleExist === 1) {
        await client.hsetAsync("dummy",person.id, JSON.stringify(person));
        let newPerson = JSON.parse(await client.hgetAsync("dummy",person.id));
        if(!newPerson) {
            redisConnection.emit(failedEvent, {
                requestId: requestId,
                data: {
                    message: "fail to save the person!"
                },
                eventName: eventName
            }); 
        }
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: {
                person: newPerson
            },
            eventName: eventName
        });
    } else {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: {
                message: "People already exist!"
            },
            eventName: eventName
        });
    }
});

redisConnection.on('delete-people-by-id:request:*', async (message, channel) => {
    let peopleId = message.data.message;
    let peopleExist = await client.existsAsync(peopleId);
    let requestId = message.requestId;
    let eventName = message.eventName;
    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;
    
    if(peopleExist === 1) {
        await client.hdelAsync("dummy",peopleId);
        let person = await client.existsAsync(peopleId);
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: {
                    message: "OK, we have deleted it!"
                },
                eventName: eventName
        });
    } else {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: {
                message: "No such person"
            },
            eventName: eventName
        });
        //console.log("error2");
    }
});

redisConnection.on('put-people-by-id:request:*', async (message, channel) => {
    let NewPerson = message.data.message;
    let person = JSON.parse(await client.hgetAsync("dummy", message.data.id));
    //let person = await client.hgetAsync("dummy",message.data.id);
    let requestId = message.requestId;
    let eventName = message.eventName;
    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;
    //console.log(person);
    if(person) {
        if(NewPerson.first_name) {
            person.first_name = NewPerson.first_name;
        }
        if(NewPerson.last_name) {
            person.last_name = NewPerson.last_name;
        }
        if(NewPerson.email) {
            person.email = NewPerson.email;
        }
        if(NewPerson.gender) {
            person.gender = NewPerson.gender;
        }
        if(NewPerson.ip_address) {
            person.ip_address = NewPerson.ip_address;
        }
        ///console.log(person);
        let person1 = JSON.stringify(person);
        await client.hsetAsync("dummy", message.data.id, person1);
        let p = JSON.parse(await client.hgetAsync("dummy",message.data.id));
        //console.log(p);
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: {
                person: p
            },
            eventName: eventName
        });
    } else {
        
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: {
                message: "No such person"
            },
            eventName: eventName
        });
        //console.log("error: no such person!");
    }
});    
