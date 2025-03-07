const auth =require('../../authentication');


module.exports = function checkAuth(){
    function middleware(req,res,next){
        const id = req.body.id;
        auth.checkToken.confirmToken(req,id);
        next();
    }

    return middleware
}