const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({msg: `Authentication Failed, Login Again to access this API..`});
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userId: payload.userId, isAdmin: payload.isAdmin }
    next()
  } catch (error) {
      return res.status(500).json({msg: error});
  }
}

module.exports = authentication
