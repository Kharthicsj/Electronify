import express from "express"

import Signup from "../controllers/Auth/Signup.js";
import Signin from "../controllers/Auth/Signin.js";
import tokenAuth from "../middlewares/TokenAuth.js";
import fetchUserData from "../controllers/users/fetchUserData.js";
import insertProduct from "../controllers/products/insertProduct.js";
import uploadBanner from "../controllers/AdminPanel/banner/uploadBanner.js";
import getAllBanners from "../controllers/AdminPanel/banner/getAllBanners.js";
import getSearchedProducts from "../controllers/products/searchProducts.js";
import deleteBanner from "../controllers/AdminPanel/banner/deleteBanner.js";
import fetchAllUsers from "../controllers/Admin/Users/GetAllUsers.js";
import updateUserRole from "../controllers/Admin/Users/UpdateUserRole.js";
import fetchAllProducts from "../controllers/products/fetchAllProducts.js";
import deleteProduct from "../controllers/products/deleteProduct.js";
import updateProduct from "../controllers/products/updateProduct.js";
import fetchFeaturedProducts from "../controllers/products/fetchFeaturedProducts.js";
import fetchPublicProducts from "../controllers/products/publicProducts.js";
import getSingleProduct from "../controllers/products/publicFetchSingleProduct.js";
import addToCart from "../controllers/Cart/addToCart.js";
import getCartItems from "../controllers/Cart/fetchCartItems.js";
import updateCart from "../controllers/Cart/UpdateCart.js";
import deleteCartItem from "../controllers/Cart/deleteCartItem.js";
import addAddress from "../controllers/users/addAddress.js";
import updateAddress from "../controllers/users/UpdateAddress.js";
import deleteAddress from "../controllers/users/deleteAddress.js";
import { createOrder } from "../controllers/orders/createOrder.js";
import getOrder from "../controllers/orders/fetchUserOrders.js";
import getAllOrders from "../controllers/orders/getAllOrders.js";
import updateOrderStatus from "../controllers/orders/updateOrderStatus.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Server Running Successfully...");
})

router.post("/signup", Signup)
router.post("/login", Signin)
router.get("/get-banners", getAllBanners);
router.get("/featured-products", fetchFeaturedProducts);
router.get("/fetch-public-products", fetchPublicProducts);
router.get("/fetch-product", getSingleProduct)
router.get("/search-products", getSearchedProducts);

//protected routes
router.use(tokenAuth);

//Products Routes
router.post("/add-product", insertProduct, tokenAuth);
router.post("/update-product", tokenAuth, updateProduct)
router.get("/fetch-products", tokenAuth, fetchAllProducts);
router.delete("/delete-product", tokenAuth, deleteProduct)

//User Routes
router.get("/userData", fetchUserData, tokenAuth);
router.post("/add-address", tokenAuth, addAddress);
router.post("/update-address", tokenAuth, updateAddress);
router.delete("/delete-address", tokenAuth, deleteAddress);


//Cart Routes
router.post("/add-to-cart", tokenAuth, addToCart)
router.get("/fetch-cart", tokenAuth, getCartItems)
router.patch("/update-cart", tokenAuth, updateCart)
router.delete("/delete-cart-item", tokenAuth, deleteCartItem)

//Banner Routes
router.post("/upload-banner", uploadBanner, tokenAuth);
router.post("/delete-banner", tokenAuth, deleteBanner)

//Admin User Routes
router.get("/all-users", tokenAuth, fetchAllUsers)
router.patch("/update-user-role", tokenAuth, updateUserRole)

//Order Router
router.post("/create-paypal-order", createOrder)
router.get("/get-orders", tokenAuth, getOrder)
router.get("/get-all-orders", tokenAuth, getAllOrders)
router.put("/update-order-status/:id", tokenAuth, updateOrderStatus)

export default router