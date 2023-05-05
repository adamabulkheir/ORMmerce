const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params,id, {
      include: [{model: Product}]
    });
    if (! categoryData) {
      res.status(404).json({message: "no category with this id"});
    } else {
      res.json(categoryData);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error"});
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id' });
    } else {
      res.json(categoryData);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// router.put('/:id', async (req, res) => {
//   // update a category by its `id` value
//   try {
//     const newCategory = await Category.findByPk(req.params.id);
//     if (!newCategory) {}
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const newCategory = await Category.findByPk(req.params.id);
    if (!newCategory) {
      res.status(404).json({ message: 'No category with this id' });
      return;
    }
    await newCategory.update(req.body);
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
