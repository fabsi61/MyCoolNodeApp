const jwt = require('jsonwebtoken');

module.exports = user => {
    //need 3 things to create a token: payload, secret and options

    //payload
    const payload = {
        id: user.id,
        username: user.username
        //can add more data
    }
    // secret muss in heroku als variable rein für production
    const secret = process.env.SECRET;
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secret, options)
}

