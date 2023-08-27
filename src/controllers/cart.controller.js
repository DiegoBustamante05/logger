import {
    CartService
} from "../services/carts.service.js";
import EErrors from "../services/errors/enums.js";
const Service = new CartService();

class CartsController {
    async create(req, res, next) {
        try {
            const newCart = await Service.newCart();
            res.status(200).send({
                status: 'success',
                data: newCart,
            });
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        const cartId = req.params.cid;
        try {
            const cart = await Service.getCartById(cartId)
            return res.status(200).json({
                status: "success",
                msg: `cart: ${cartId}`,
                data: cart,
            })
        } catch (error) {
            next(error)
        }
    }

    async addToCart(req, res, next) {
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            await Service.addProductToCart(cid, pid);
            res
                .status(200)
                .send({
                    status: "success",
                    data: "product added"
                });
        } catch (error) {
            next(error)
        }
    }

    async clearCart(req, res, next) {
        try {
            const cid = req.params.cid;
            console.log(cid)
            const clear = await Service.clearCart(cid);
            res.status(200).json({
                status: 'success',
                data: clear,
            });
        } catch (error) {
            next(error)
        }
    }


    async deleteProductById(req, res, next) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const productToDelete = await Service.deleteProductInCart(cid, pid)
            res.status(200).json({
                status: 'success',
                message: 'product deleted',
            });
        } catch (error) {
            next(error)
        }
    }

    async updateProductQuantityInCart(req, res, next) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const quantity = req.body.quantity;
            const productUpdated = await Service.updateQuantity(cid, pid, quantity)
            res.status(200).json({
                status: 'success',
                message: `product updated`,
            });
        } catch (error) {
            next(error)
        }
    }

    async updateProductsInCart(req, res, next) {
        try {
            const cid = req.params.cid;
            const products = req.body;
            console.log(products)
            await Service.updateCart(cid, products);
            res.status(200).json({
                status: 'success',
                message: `product updated`,
            });
        } catch (error) {
            next(error)
        }
    }

    async purchase(req, res) {
        try {
            const cartId = req.params.cid;
            const purchaseResult = await Service.purchaseCart(cartId); 

            if (purchaseResult.success) {
                return res.json({
                    message: 'Successful',
                    ticket: purchaseResult.ticket,
                    data: 'Products out of stock: ' + purchaseResult.productsNotPurchasedIds,
                });
            } else {
                return res.status(400).json({ error: purchaseResult.message });
            }
        } catch (error) {
            next(error)
        }
    }
}

export const cartsController = new CartsController