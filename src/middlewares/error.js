import EErrors from "../services/errors/enums.js";

export default (error, req, res, next) => {
    switch (error.code) {
        case EErrors.DATABASE_CONECTION_ERROR:
            res
                .status(404)
                .send({
                    status: "error",
                    error: error.name,
                    cause: error.cause,
                    message: error.message,
                    code: error.code,
                });
            break;
            case EErrors.INVALID_TYPES_ERROR:
                res
                    .status(400)
                    .send({
                        status: "error",
                        error: error.name,
                        cause: error.cause,
                        message: error.message,
                        code: error.code,
                    });
                break;
        case EErrors.AUTH_ERROR:
            res
                .status(403)
                .send({
                    status: "error",
                    error: error.name,
                    cause: error.cause,
                    message: error.message,
                    code: error.code,
                });
            break;
        default:
            res.status(500).send({
                status: "error",
                error: "something went wrong"
            });
            break;
    }
};