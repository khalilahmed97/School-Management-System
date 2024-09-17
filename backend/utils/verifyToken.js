const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token){
        return res.send(401).json({message: "You are not Authenticated!"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err){
            return res.send(403).json({message: "Token is Invalid!"})
        }
        else{
            req.user = user
        }

        next()
    })
}


  const verifyUser = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
        }
        else{
            return res.send(403).json({message: "User is not Authorized!"})
        }
    })
}


const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin){
            next()
        }
        else{
            return res.send(403).json({message: "User is not Authorized!"})
        }
    })
}

module.exports = {verifyAdmin, verifyToken, verifyUser}