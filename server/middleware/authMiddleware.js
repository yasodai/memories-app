const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1]
    
    const isCustomAuth = token.length < 500

    let decodedToken

    if(token && isCustomAuth){
     decodedToken =  jwt.verify(token,'test')
     console.log(decodedToken);
     req.userId = decodedToken.id
    } else {
      decodedToken = jwt.decode(token)
      console.log(decodedToken);
      req.userId = decodedToken.sub
    }
    next()
  } catch (err) {
    console.log(err);
  }
}

module.exports = requireAuth