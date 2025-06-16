const jwt = require('jsonwebtoken');

// route protection
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    // 1. if the user is not authenticated (doesnt have token), deny access
    if(!token){
        return res.status(401).json({
            msg: 'No token, Access denied'
        });
    }

    try {
        // 2. if the jwt token matches, then user is authenticated
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Invalid Token'
        });
    }
}

module.exports = protect;