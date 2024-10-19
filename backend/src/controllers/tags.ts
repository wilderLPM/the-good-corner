import express from "express";
import { Tag } from "../entities/Tag";
import { Like } from "typeorm";

export const router = express.Router();

router.get("", async (req, res) => {
  const name = req.query.name?.toString()

  if(name) {
    const tags = await Tag.find({
      where: {
        name: Like(`%${name}%`)
      }
    })  
    res.json(tags);
  } else {
    const tags = await Tag.find();
    res.json(tags);
  }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const tag = await Tag.findOneBy({id});
    if(tag !== null) {
        res.json(tag)
    } else {
        res.status(404).json("The tag with id " + id + " does not exist.");
    }
})

router.post("", async (req, res) => {
  const newTag = new Tag();
  newTag.name = req.body.name;
  await newTag.save();
  res.json(newTag);
});

router.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const tag = await Tag.findOneBy({ id });
        if (tag !== null) {
            Object.assign(tag, req.body);
            await tag.save();
            res.json(tag);
        } else {
            res.status(404).send();
        }
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.patch("/:id", async (req, res) => { // voir si l'id existe : .length === 1 ?
    const id = Number(req.params.id);
    try {
        await Tag.update({id}, req.body);
        const updatedTag = await Tag.findOneBy({id});
        res.json(updatedTag);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const tag = await Tag.findOneBy({ id });
    if (tag !== null) {
      await tag.remove();
      res.json(tag);
    } else {
      res.status(404).send();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

// --------------------- END OF CATEGORIES ENDPOINTS -------------------

// app.get("/tags/:id/ads", (req, res) => {
    //   const id = Number(req.params.id);
    //   db.each('')
    // })
    
    // OU :
    
// app.get("/ads?tag=machin&tag=truc", )
  