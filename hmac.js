var crypto = require('crypto');

function handler(event) {
    var request = event.request;
    var secret = request.cookies["cf-secret"].value;
    
    var hmac = crypto.createHmac("sha256", secret);
    hmac.update(request.uri.split("?")[0]);
    request.headers["cf-auth"] = { value: hmac.digest("base64") }

    return request;
}
