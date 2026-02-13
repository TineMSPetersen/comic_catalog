import type { Request, Response } from "express-serve-static-core";
import comicModel from "../models/comicModel.ts";

const addComic = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, author, picture, chapterCount } = req.body;

    const comicData = {
      title,
      author,
      picture,
      chapterCount
    }

    const comic = new comicModel(comicData)
    await comic.save()

      res.json({ success: true, message: "Comic Added!" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export { addComic }