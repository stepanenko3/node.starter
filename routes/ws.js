const express = require('express');
const router = express.Router();

router.ws('/echo', function (ws, req) {
    ws.on('message', function (msg) {
        ws.send(JSON.stringify(msg));

    });
});

module.exports = router;