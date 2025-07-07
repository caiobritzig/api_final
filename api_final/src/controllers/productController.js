const Product = require('../models/product');
const Category = require('../models/category');

exports.create = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const product = await Product.create({ name, description, price, stock, categoryId });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar produto' });
  }
};

exports.list = async (req, res) => {
  const products = await Product.findAll({ include: ['category'] });
  res.json(products);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id, { include: ['category'] });
  if (!product) return res.status(404).send('Produto não encontrado');
  res.json(product);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, categoryId } = req.body;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).send('Produto não encontrado');
  if (name !== undefined) product.name = name;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price;
  if (stock !== undefined) product.stock = stock;
  if (categoryId !== undefined) product.categoryId = categoryId;
  await product.save();
  res.json(product);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).send('Produto não encontrado');
  await product.destroy();
  res.sendStatus(204);
};