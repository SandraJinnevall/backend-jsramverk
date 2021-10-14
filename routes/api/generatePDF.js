const express = require('express')
const router = express()

router.post('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    try {
        var data = await res.pdfFromHTML({
            filename: 'generated.pdf',
            htmlContent: req.body.documentText
        });
        res.statusCode = 200;
        return data
    } catch (error) {
        console.log('Need to be a html-string');
        res.status(500).json({ message: error.message })
    } 
})

module.exports = router