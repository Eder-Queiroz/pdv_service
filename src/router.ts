import { Router } from "express";
import isAuthenticated from "./middleware/isAuthenticated";
import {
  authUserController,
  createUserController,
  dataUserController,
} from "./controller/user";
import {
  createCategoryController,
  getCategoriesController,
  updateCategoryController,
} from "./controller/category";
import {
  createProductController,
  getProductsController,
  updateProductController,
  getOneProductController,
  getProductByBarCodeController,
} from "./controller/products";
import {
  startShiftController,
  endShiftController,
  findShiftsController,
  findShiftByUserIdController,
} from "./controller/shifts";
import { createSaleController, getSalesController } from "./controller/sales";
import {
  registerChangedController,
  getChangedController,
} from "./controller/changeds";

const router = Router();

router.post("/login", (req, res) => authUserController(req, res));
router.post("/register", isAuthenticated, (req, res) =>
  createUserController(req, res)
);
router.get("/me", isAuthenticated, (req, res) => dataUserController(req, res));

router.post("/category", isAuthenticated, (req, res) =>
  createCategoryController(req, res)
);
router.get("/category", (req, res) => getCategoriesController(req, res));
router.put("/category", isAuthenticated, (req, res) =>
  updateCategoryController(req, res)
);

router.post("/product", isAuthenticated, (req, res) =>
  createProductController(req, res)
);
router.get("/product", (req, res) => getProductsController(req, res));
router.get("/product/:id", (req, res) => getOneProductController(req, res));
router.get("/product/barcode/:bar_code", (req, res) =>
  getProductByBarCodeController(req, res)
);
router.put("/product", isAuthenticated, (req, res) =>
  updateProductController(req, res)
);

router.post("/shift", isAuthenticated, (req, res) =>
  startShiftController(req, res)
);
router.put("/shift", isAuthenticated, (req, res) =>
  endShiftController(req, res)
);
router.get("/shift", (req, res) => findShiftsController(req, res));
router.get("/shift/user", isAuthenticated, (req, res) =>
  findShiftByUserIdController(req, res)
);

router.post("/sale", isAuthenticated, (req, res) =>
  createSaleController(req, res)
);
router.get("/sale", (req, res) => getSalesController(req, res));

router.post("/changed", isAuthenticated, (req, res) =>
  registerChangedController(req, res)
);
router.get("/changed", (req, res) => getChangedController(req, res));

export default router;
