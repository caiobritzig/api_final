const Order = require('../models/order');
const Product = require('../models/product');
const OrderProduct = require('../models/orderProduct');

exports.create = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products } = req.body;
    const order = await Order.create({ userId });
    for (const item of products) {
      await OrderProduct.create({ orderId: order.id, productId: item.productId, quantity: item.quantity });
    }
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar pedido' });
  }
};

exports.list = async (req, res) => {
  const orders = await Order.findAll({
    where: { userId: req.user.id },
    include: [{ model: Product, as: 'products' }]
  });
  res.json(orders);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id, { include: [{ model: Product, as: 'products' }] });
  if (!order || order.userId !== req.user.id) return res.status(404).send('Pedido não encontrado');
  res.json(order);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id);
  if (!order || order.userId !== req.user.id) return res.status(404).send('Pedido não encontrado');
  await order.destroy();
  res.sendStatus(204);
};