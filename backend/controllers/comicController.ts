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
    const { comicId, chapterCount, currentChapter } = req.body;

    const comic = await comicModel.findById(comicId);

    if (currentChapter > chapterCount) {
      res.json({ success: false, message: "Current chapter can't exceed chapter count", comic });
    }
    if (currentChapter < 0) {
      res.json({ success: false, message: "Current chapter can't be negative" });
    }

    if (currentChapter === chapterCount) comic.status = "Complete"
    if (currentChapter < chapterCount) comic.status = "Reading"
    
    comic.currentChapter = currentChapter;
    
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

const setFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { comicId } = req.body;

    const comic = await comicModel.findById(comicId);

    comic.favorite = !comic.favorite

    await comic.save();

    res.json({ success: true, comic });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
} 

const changeStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { comicId, status } = req.body;

    const comic = await comicModel.findById(comicId);

    if (status === "Complete") comic.currentChapter = comic.chapterCount;
    

    comic.status = status;

    if (comic.currentChapter === comic.chapterCount) comic.status = "Complete";

    await comic.save();

    res.json({ success: true, comic });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}


export { addComic, listComics, chapterCount, setFavorite, changeStatus }