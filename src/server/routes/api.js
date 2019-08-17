const express = require('express')
const router = express.Router()
const Client = require('../models/Client')

router.post('/clients', async function (req, res) {
    let client = new Client(req.body)
    await client.save()
    res.send(client)
})

router.get('/clients', function (req, res) {
    Client.find({}, function (err, clients) {
        res.send(clients)
    })
})

router.put('/clients', function (req, res) {
    let data = req.body
    Client.findByIdAndUpdate(data.id, { [data.key]: data.value }, function (err, data) {
        res.send(data)
    })
})

router.put('/clientsPopUp', function (req, res) {
    let data = req.body
    Client.findByIdAndUpdate(data._id, { name: data.name, email: data.email, country: data.country }, function (err, data) {
        res.send(data)
    })
})

router.delete('/clients/:id', function (req, res) {
    let id = req.params.id
    Client.findByIdAndDelete({_id:id}, function (err, data) {
        res.send(data)
    })
})

module.exports = router