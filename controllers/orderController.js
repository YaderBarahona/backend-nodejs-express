const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { products, totalPrice } = req.body;
  const userId = req.user._id; 

  try {
    const orderProducts = products.map(product => ({
      productId: product.id,
      title: product.title, 
      quantity: product.quantity,
      price: product.price
    }));

    const order = new Order({
      user: userId,
      products: orderProducts,
      totalPrice
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
