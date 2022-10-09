import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// NOTE @desc  Create new orders
// NOTE @routes  POSt /api/orders
// NOTE  @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  console.log("req, ", req.body);
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    console.log(order, order);

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

// NOTE @desc  Get order by ID
// NOTE @routes GET /api/orders/:id
// NOTE  @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(400);
    throw new Error("Order not found");
  }
});

//  @desc  update order to paid
//  @routes GET /api/orders/:id/pay
//   @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email: req.body.payer.email_address,
      update_time: req.body.update_time,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("Order not found");
  }
});

//  @desc  update order to delivered
//  @routes GET /api/orders/:id/deliver
//   @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    console.log();
    order.isDeliverd = true;
    order.DeliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(400);
    x;
    throw new Error("Order not found");
  }
});

//  @desc  get logged in user orders
//  @routes GET /api/orders/myorders
//   @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
