class AppError extends Error{
    statusCode:number;
    success:boolean
    constructor(status:number,message:string){
        super(message)
        this.statusCode = status
        this.success = false

        Error.captureStackTrace(this,this.constructor)
    }
}

export default AppError;