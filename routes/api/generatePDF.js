const express = require('express')
const router = express()

router.post('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    return res.pdfFromHTML({
        filename: 'generated.pdf',
        htmlContent: req.body.documentText
    });
})

module.exports = router