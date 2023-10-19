import {Router} from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "../services/product.services";
import validatorHandler from "../middlewares/validationHandler";
import {
  createProductSchema,
  getAllProductsSchema,
  getProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "../schemas/product.schema";

const router = Router();

router.get(
  "/",
  validatorHandler(getAllProductsSchema, "query"),
  async (req, res) => {
    const products = await getProducts();
    res.json(products);
  }
);

router.get(
  "/:product_id",
  validatorHandler(getProductSchema, "params"),
  async (req, res) => {
    const product = await getProductById(Number(req.params.product_id));
    res.json(product);
  }
);

router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req, res) => {
    const newProduct = await createProduct(req.body);
    res.json(newProduct);
  }
);

router.put(
  "/:product_id",
  validatorHandler(updateProductSchema, "params"),
  async (req, res) => {
    const updatedProduct = await updateProduct(
      Number(req.params.product_id),
      req.body
    );
    res.json(updatedProduct);
  }
);

router.delete(
  "/:product_id",
  validatorHandler(deleteProductSchema, "params"),
  async (req, res) => {
    const deletedProduct = await deleteProduct(Number(req.params.product_id));
    res.json(deletedProduct);
  }
);

export default router;
