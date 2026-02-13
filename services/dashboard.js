const express = require('express')

module.exports = async (req, res, next) => {
    res.render('dashboard', {
        user: req.session.user,
        date: new Date().toLocaleDateString()
    })
}