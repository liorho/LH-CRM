const express = require('express')
const router = express.Router()
const Client = require('../models/Client')



router.post('/clients',async function (req,res){
    let client = new Client(req.body)
    await client.save()
    res.send(client)
})



// get clients
router.get('/clients', function (req, res) {
    Client.find({}, function (err, clients) {
        res.send(clients)
    })
})


module.exports = router