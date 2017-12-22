const axiosInstance = require("./axiosInstance");
const redisConnection = require("./redis-connection");

redisConnection.on('searchImage:request:*', async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let messageText = message.data.message;
    //console.log(messageText)
    let response = await axiosInstance(messageText);
    //console.log(response);
    let hits = response.hits;
    let url = [];
    for(let i = 0; i < hits.length; i++) {
        url.push(hits[i].webformatURL);
    }
    //console.log(url);
    let successEvent = `${eventName}:success:${requestId}`;

    redisConnection.emit(successEvent, {
        requestId: requestId,
        data: {
            message: url
        },
        eventName: eventName
    });
});