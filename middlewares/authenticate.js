const express = require('express')

module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/");
  }
  next();
};