import EErrors from "../services/errors/enums.js";
import CustomError from "../services/errors/custom-error.js";
export function checkUser(req, res, next) {
    if (req.user != undefined && req.user.email ) {
        return next();
    }
    return res.status(401).render('error-page', {
        msg: 'Please log in'
    });
}

export function checkAdmin(req, res, next) {
    if (req.user != undefined && req.user.role === 'admin')  {
        return next();
    }
    CustomError.createError({
        name: "Authentication Error",
        cause: "the user does not have permission to access this site.",
        message: "please login as administrator",
        code: EErrors.AUTH_ERROR,
    });
}

export function checkUserLoggedIn(req, res, next) {
    if (!req.user) {
        return next();
    }
    return res.status(401).render('error-page', {
        msg: 'You are already logged in'
    });
}

export function checkUserRole(req, res, next) {
    if (req.user != undefined && req.user.role === 'user') {
        return next();
    } else {
        CustomError.createError({
            name: "Authentication Error",
            cause: "You don't have permission to access the chat",
            message: "please login as user",
            code: EErrors.AUTH_ERROR,
        });
    }

}

export const checkCartOwner = (req, res, next) => {
    
    if (req.user && req.user.cart.toString() === req.body.cartId) {
        next(); 
    } else {
        return res.status(403).json({
            message: 'You do not have permissions to perform this action'
        });
    }
};