function getTokenAccess(req) {
    const token = req.headers['authorization'];

    if (token) {
        var arrayToken = token.split(" ");
        console.log("Extract tokenAccess", arrayToken[1])
        return arrayToken[1]
    }
}

function getTokenId(req) {
    const token = req.headers['idtoken'];

    if (token) {
        console.log("Extract tokenID ", token)
        return token
    }
}

function getTokenRefresh(req) {
    const token = req.headers['TokenRefresh'];
    if (token) {

        return token
    }
}

module.exports = {
    getTokenAccess,
    getTokenId,
    getTokenRefresh
}