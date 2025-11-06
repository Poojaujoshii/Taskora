export const errorhandling = (err,req,res,next)=>{
    console.log("error",err.message);
    const statusCode = res.statusCode = 200?500:res.statusCode

    res.status(statusCode).json({
        message: err.message || "Something went wrong"
    })
}