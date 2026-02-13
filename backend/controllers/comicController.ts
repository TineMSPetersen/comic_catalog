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

const listComics = async (req: Request, res: Response): Promise<void> => {
  try {
    const comics = await comicModel.find();

    res.json({
      success: true,
      comics,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}

const chapterCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { comicId, currentChapter } = req.body;

    const comic = await comicModel.findById(comicId);

    if (currentChapter) comic.currentChapter = currentChapter;
    
    await comic.save();

    res.json({ success: true, message: "Chapter count udpated", comic });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}

export { addComic, listComics, chapterCount }