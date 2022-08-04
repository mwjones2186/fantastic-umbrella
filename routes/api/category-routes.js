const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update({
    where: {
      id: req.params.id,
    },
  }).then((category) => {
    const categories = category.map(({category_id}) => category_id);
    const newCategories = req.body.category_id
      .filter((category_id) => !category_id.includes(category_id))
      .map((category_id) =>{
        return {
          category_id: req.params.category_id,
          category_id,
        };
      });
    if (!dbCategoryData) {
      res.status(404).json({message: 'No category found with that ID'});
      return;
    }
    res.json(dbCategoryData);
  }).catch(err =>{
    res.status(500).json(err);
  })
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
    Category.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbCategoryData =>{
      if (!dbCategoryData) {
        res.status(404).json({message: 'No category found with that ID'});
        return;
      }
      res.json(dbCategoryData);
    }).catch(err =>{
      res.status(500).json(err);
    })
});

module.exports = router;
