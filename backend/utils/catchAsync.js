export const catchAsync = (fn)=>(req,res,next)=>{
    return Promise.resolve(fn(req,res,next)).catch((e)=>{
        console.log("promise can e bracket");
        next(e)
    })
}