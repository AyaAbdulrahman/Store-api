import express from 'express';

const productRoutes = express.Router();

let products = [
  { id: '1', name: "Laptop", price: 1200 },
  { id: '2', name: "Phone", price: 800 },
  { id: '3', name: "Tablet", price: 500 }
];

// api/products - gets all products
productRoutes.get('/', (req, res) => {
  res.json(products);
});

// api/products/id - get a single product by ID
productRoutes.get('/:id', (req, res) => {
  const product = products.find(item => item.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// POST /api/products - add a new product
productRoutes.post('/', (req, res) => {
  const { id, name, price } = req.body;
  const existing = products.find(item => item.id === id);
  if (existing) {
    return res.status(400).json({ message: "Product with this id already exists" });
  }
  const newProduct = { id, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// DELETE /api/products/:id - delete a product by ID
productRoutes.delete('/:id', (req, res) => {
  const index = products.findIndex(item => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  const deletedProduct = products.splice(index, 1)[0];
  res.json({ message: "Product deleted", product: deletedProduct });
});

export default productRoutes;
