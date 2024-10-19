import express from "express";
import { Ad } from "../entities/Ad";
import { validate } from "class-validator";
import { Like } from "typeorm";

export const router = express.Router();

router.get("", async (req, res) => {
  const category = req.query.category
  
  if(category){
    const adsByCategory = await Ad.find({
      relations: {
        category: true,
      },
      where: {
        category: {
          name: Like(`%${category}`)
        }
      }});
  res.json(adsByCategory)
  } else {
    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true
      }
    });
    res.json(ads);
  }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const ad = await Ad.findOneBy({id});
    if (ad !== null) {
        res.json(ad);
    } else {
        res.status(404).send("The ad with id " +  id + " doesn't exist.")
    }
});

router.post("", async (req, res) => {
  try {
    const newAd = new Ad();
    Object.assign(newAd, req.body);

    const errors = await validate(newAd);
    if (errors.length) {
      res.status(400).json(errors);
    } else {
      await newAd.save();
      res.json(newAd);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const ad = await Ad.findOneBy({ id });
        if (ad !== null) {
            const newAd = new Ad();
            Object.assign(newAd, req.body, {id: id, created_at: ad.created_at});
            
            const errors = await validate(newAd);
            if (errors.length) {
                res.status(400).json(["The ad you provided did not pass validation.", errors]);
            } else {
                await ad.remove();
                await newAd.save();
                res.json(newAd);
            }
        } else {
            res.status(404).send("The ad with id " +  id + " doesn't exist.");
        }
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

// partial edit
router.patch("/:id", async (req, res) => { // voir si l'id existe : .length === 1 ?
    const id = Number(req.params.id);
    try {
        await Ad.update({id}, req.body);
        const updatedAd = await Ad.findOneBy({id});
        res.json(updatedAd);
    } catch (error) {
        res.status(500).json(error);
    }
})

// router.patch("/:id", async (req, res) => {
//     try {
//         const id = Number(req.params.id);
//         const ad = await Ad.findOneBy({ id });
//         if (ad !== null) {
//             Object.assign(ad, req.body);
            
//             const errors = await validate(ad);
//             if (errors.length) {
//                 res.status(400).json(errors);
//             } else {
//                 await ad.save();
//                 res.json(ad);
//             }
//         } else {
//             res.status(404).send();
//         }
//     } catch (e) {
//         console.error(e);
//         res.status(500).send();
//     }
// });

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const ad = await Ad.findOneBy({ id });
    if (ad !== null) {
      await ad.remove();
      res.json(['The following ad has successfully been deleted :', ad]);
    } else {
      res.status(404).send();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});
