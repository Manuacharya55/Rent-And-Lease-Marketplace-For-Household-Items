export const GlobalErrorHandler = (err,req,res,next)=>{
    const statuscode = err.statuscode || 500;
    const success = err.success;
    const message = err.message;
    const data = err.data;

    res.status(statuscode).json({
        statuscode,
        success,
        message,
        data
    })
}