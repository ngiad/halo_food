export const thisAdmin = async(req,res,next) => {
    try {
        console.log(req.headers);
        if(!!req.headers.isadmin) next()
        else{
            throw new Error("is not admin !")
        }
    } catch (error) {
        res.status(401)
        next(error)
    }
}