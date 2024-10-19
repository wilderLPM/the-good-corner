import express from "express";
import { Category } from "../entities/Category";
import { Like } from "typeorm";

export const router = express.Router();

router.get("", async (req, res) => {
  const name = req.query.name?.toString()

  if(name) {
    const categories = await Category.find({
      where: {
        name: Like(`%${name}%`)
      }
    })  
    res.json(categories);
  } else {
    const categories = await Category.find();
    res.json(categories);
  }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const category = await Category.findOneBy({id});
    if(category !== null) {
        res.json(category)
    } else {
        res.status(404).json("The category with id " + id + " does not exist.");
    }
})

router.post("", async (req, res) => {
  const newCategory = new Category();
  newCategory.name = req.body.name;
  await newCategory.save();
  res.json(newCategory);
});

router.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const category = await Category.findOneBy({ id });
        if (category !== null) {
            Object.assign(category, req.body);
            await category.save();
            res.json(category);
        } else {
            res.status(404).send();
        }
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.patch("/:id", async (req, res) => { // empêcher le changement d'id
    const id = Number(req.params.id);
    const exists = await Category.findOneBy({id});
    if (exists) {
      try {
          const name = {"name": req.body.name};
          await Category.update({id}, name);
          const updatedCategory = await Category.findOneBy({id});
          res.json(updatedCategory);
      } catch (error) {
          res.status(500).json(error);
      }
    }
    else {
      res.status(404).json("Could not find a category with id " + id + ".");
    }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const category = await Category.findOneBy({ id });
    if (category !== null) {
      await category.remove();
      res.json("Category successfully deleted");
    } else {
      res.status(404).json("Could not find a category with id " + id + ".");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

// --------------------- END OF CATEGORIES ENDPOINTS -------------------

// app.get("/categories/:id/ads", (req, res) => {
    //   const id = Number(req.params.id);
    //   db.each('')
    // })
    
    // OU :
    
// app.get("/ads?category=machin&category=truc", )
  