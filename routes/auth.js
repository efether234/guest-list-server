const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User } = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()

router.post('/', async (req, res) => {
    let user = await User.findOne({ username: req.body.username })
    if(!user) return res.status(400).send('Invalid username or password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid username or password.')

    const token = user.generateAuthToken()
    res.send(token)
})

module.exports = router