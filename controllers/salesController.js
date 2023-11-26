// salesController.js
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const getSalesOverviewController = async (req, res) => {
  try {
    const orders = await Order.find().populate("products");

    let totalRevenue = 0;
    let mostSoldProduct = null;
    let maxQuantitySold = 0;

    for (const order of orders) {
      for (const product of order.products) {
        const productData = await Product.findById(product._id);

        const productTotalAmount = productData.price * product.quantity;

        totalRevenue += productTotalAmount;

        if (product.quantity > maxQuantitySold) {
          mostSoldProduct = productData;
          maxQuantitySold = product.quantity;
        }
      }
    }

    const orderCount = orders.length;

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        orderCount,
        mostSoldProduct: mostSoldProduct
          ? { name: mostSoldProduct.name, quantitySold: maxQuantitySold }
          : null,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
