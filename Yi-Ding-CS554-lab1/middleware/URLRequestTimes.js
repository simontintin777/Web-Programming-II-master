var counter = {}
module.exports = {
    
        URLRequestTimes:function (req, res, next) {
            if (counter.hasOwnProperty(req.originalUrl)) {
                counter[req.originalUrl] ++;
                console.log('request: localhost:3000',req.originalUrl,' for ',counter[req.originalUrl] + 1,' times!');
            }
            else {
                counter[req.originalUrl] = 0;
                console.log('request: http://localhost:3000', req.originalUrl,' for the first time!');
            }
            next();
        }
    }