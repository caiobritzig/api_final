const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./order');
const Product = require('./product');

const OrderProduct = sequelize.define('OrderProduct', {
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
});

Order.belongsToMany(Product, { through: OrderProduct, as: 'products', foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderProduct, as: 'orders', foreignKey: 'productId' });

module.exports = OrderProduct;