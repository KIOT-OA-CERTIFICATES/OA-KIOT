const Apihandler = (requestedfunction) => async(req,res,next)=>{
    try {
        return  await requestedfunction(req,res,next)
    } catch (error) {
        next(error)
    }
}
export default Apihandler