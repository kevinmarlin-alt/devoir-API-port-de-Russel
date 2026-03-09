const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.port_russell_token

  if(!token) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
    
  } catch (error) {

  }  
  //if (!req.session.user) {
  //  return res.status(401).redirect("/");
  //}

};