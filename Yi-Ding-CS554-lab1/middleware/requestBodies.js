module.exports = {
    requestBodies:function (req, res, next) {
        console.log('Body:', req.body);
        console.log('HTTP verb:',req.method);
        next();
    }
}