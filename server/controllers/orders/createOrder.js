import paypal from "../../utils/paypal.js";
import Order from "../../models/Orders.js";

import dotenv from "dotenv"
dotenv.config()

export const createOrder = async (req, res) => {
    try {
        const { userId } = req.userData
        const {
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
        } = req.body;

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            redirect_urls: {
                return_url: `${process.env.CLIENT_URL}/paypal-return`,
                cancel_url: `${process.env.CLIENT_URL}/paypal-cancel`,
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: "USD",
                            quantity: item.quantity,
                        })),
                    },
                    amount: {
                        currency: "USD",
                        total: totalAmount.toFixed(2),
                    },
                    description: "Purchase from E-commerce Store",
                },
            ],
        };

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.error("PayPal payment creation error:", error);
                return res.status(500).json({
                    success: false,
                    message: "Failed to create PayPal payment",
                });
            }

            const approvalURL = paymentInfo.links.find(
                (link) => link.rel === "approval_url"
            )?.href;

            if (!approvalURL) {
                return res.status(500).json({
                    success: false,
                    message: "Approval URL not found in PayPal response",
                });
            }

            const order = new Order({
                userId,
                cartItems,
                addressInfo,
                orderStatus,
                paymentMethod,
                paymentStatus: "Successful",
                totalAmount,
                orderDate,
                orderUpdateDate,
                paymentId,
                payerId,
            });

            await order.save();

            return res.status(201).json({
                success: true,
                approvalURL,
                orderId: order._id,
            });
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while creating the order",
        });
    }
};
