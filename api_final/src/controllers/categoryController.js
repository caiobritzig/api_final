const Category = require('../models/category');
const Product = require('../models/product');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar categoria' });
  }
};

exports.list = async (req, res) => {
  const categories = await Category.findAll({ include: ['products'] });
  res.json(categories);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByPk(id);
  if (!category) return res.status(404).send('Categoria não encontrada');
  category.name = name;
  await category.save();
  res.json(category);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id, { include: ['products'] });
  if (!category) return res.status(404).send('Categoria não encontrada');
  if (category.products && category.products.length > 0) {
    return res.status(400).json({ error: 'Categoria possui produtos associados' });
  }
  await category.destroy();
  res.sendStatus(204);
};