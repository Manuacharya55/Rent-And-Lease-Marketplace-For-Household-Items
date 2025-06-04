export const GlobalErrorHandler = (err,req,res,next)=>{
    const statuscode = err.statuscode || 500;
    const success = err.success || false;
    const message = err.message || "Internal Server Error";
    const data = err.data || [];

    console.error("global error handler",err);
    res.status(statuscode).json({
        statuscode,
        success,
        message,
        data
    })
}