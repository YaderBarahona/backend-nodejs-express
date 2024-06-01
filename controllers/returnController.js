const Return = require('../models/Return');
const Order = require('../models/Order');

exports.createReturn = async (req, res) => {
  const { orderId, reason } = req.body;
  const userId = req.user.id; 

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You do not have permission to return this order' });
    }

    const returnRequest = new Return({ order: orderId, reason, status: 'Requested' });
    await returnRequest.save();

    order.status = 'Returned';
    await order.save();

    res.status(201).json(returnRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReturnStatus = async (req, res) => {
  const { returnId, status } = req.body;
  const validStatuses = ['Requested', 'Processing', 'Completed', 'Rejected'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const returnRequest = await Return.findById(returnId);
    if (!returnRequest) {
      return res.status(404).json({ message: 'Return request not found' });
    }

    returnRequest.status = status;
    await returnRequest.save();

    res.status(200).json(returnRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getReturnsByUser = async (req, res) => {
  const userId = req.user; 

  try {
    const returns = await Return.find()
      .populate({
        path: 'order',
        match: { user: userId } // Solo devuelve las devoluciones de los pedidos del usuario
      });

    // Filtrar las devoluciones que no tengan un pedido coincidente (porque el usuario no coincide)
    const userReturns = returns.filter(returnRequest => returnRequest.order);

    res.status(200).json(userReturns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
