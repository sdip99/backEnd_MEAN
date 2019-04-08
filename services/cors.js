module.exports = function cors (req, resp,next) {
    resp.header("Access-Control-Allow-Origin","*");
    resp.header("Access-Control-Allow-Headers","Content-Type, Authorization");
    next();
}