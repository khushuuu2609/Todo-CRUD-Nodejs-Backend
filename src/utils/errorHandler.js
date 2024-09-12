import { HttpError } from "../class/httpError.js";

const errorHandler = async (error, req, res, next) => {
    try {
        const status = error.status || 500;
        const message = error.message || "Internal server error"
        if (error instanceof HttpError) {
            return res.status(status).json({ message, status: "error" })
        }
        return res.status(status).json({ message })
    } catch (error) {
        console.error(error);
    }
}

export default errorHandler;