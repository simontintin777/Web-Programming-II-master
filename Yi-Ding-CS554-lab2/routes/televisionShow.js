const express = require('express');
const router = express.Router();
const data = require("../data");
const show = data.shows;
const path = require('path');

router.get("/", (req, res) => {
        return show.getAllShows().then((showList) => {
            res.render("layouts/televisionShow", {show:showList});
        }).catch(() => {
            let route = path.resolve(`static/404.html`);
            res.sendFile(route);
        })
    });
    
    module.exports = router;