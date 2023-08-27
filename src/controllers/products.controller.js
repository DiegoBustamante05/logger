import { ProductService } from "../services/products.service.js";
import CustomError from "../services/errors/custom-error.js";
import EErrors from "../services/errors/enums.js";
import { generateProductErrorInfo } from "../services/errors/info.js";
import { generateUpdateProductErrorInfo } from "../services/errors/info.js";
const Service = new ProductService();

class ProductsController {
    async add(req, res, next) {
        const newProduct = req.body;
        try {
            const addProduct = await Service.addProduct(newProduct)
            return res.status(201).json({
                status: "success",
                msg: "Product created",
                data: addProduct,
            });
        } catch (error) {
            CustomError.createError({
                name: "error creating product",
                cause: generateProductErrorInfo(newProduct),
                message: "Error trying to create product",
                code: EErrors.INVALID_TYPES_ERROR,
            });
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const {
                limit = 10, page = 1, query, sort
            } = req.query;
            const products = await Service.getAllProducts(
                limit,
                page,
                query,
                sort
            );
            return res.status(200).json({
                payload: products.docs.map((product) => ({
                    id: product._id.toString(),
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    thumbnails: product.thumbnails,
                    status: product.status,
                    code: product.code,
                    category: product.category,
                })),
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
            });
        } catch (error) {
            next(error);
        }
    }
    async getById(req,res, next) {
        try {
            let productId = req.params.pid;
            let productFound = await Service.getById(productId);
            res.status(200).send({
                status: "success",
                data: productFound,
            })
        } catch (error) {
            next(error)
        }
    }
    async update(req,res, next) {
        const newProduct = req.body;
        try {
            const id = req.params.pid;
            await Service.updateOne(id, newProduct);
            console.log("Product " + id + " was modified")
            return res.status(201).json({
                status: "success",
                msg: "successfully modified product",
                data: newProduct,
            });
        } catch (error) {
            CustomError.createError({
                name: "failed to update",
                cause: generateUpdateProductErrorInfo(newProduct),
                message: "error updating the product",
                code: EErrors.INVALID_TYPES_ERROR,
            });
            next(error);
        }
    }
    async delete(req,res, next) {
        try {
            const idToDelete = req.params.pid;
            await Service.deleteProduct(idToDelete);
            console.log("Product " + idToDelete + " deleted")
            return res.status(200).send({
                status: "success",
                msg: "Product deleted",
            })
        } catch (error) {
            next(error);
        }
    }
}


export const productsController = new ProductsController