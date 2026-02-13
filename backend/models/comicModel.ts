import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComic {
  title: string;
  author: string[];
  picture: string;
  status: string;
  chapterCount: number;
  currentChapter: number;
  favorite: boolean;
}

const comicSchema = new Schema<IComic>(
  {
    title: { type: String, required: true },
    author: { type: [String], default: ["No author listed"] },
    picture: { type: String, required: true },
    status: { type: String, default: "Later"},
    chapterCount: {type: Number, default: 1},
    currentChapter: {type: Number, default: 0},
    favorite: { type: Boolean, default: false}
  },
  { timestamps: true }
)

const comicModel =
  mongoose.models.comic || mongoose.model<IComic>("comic", comicSchema);

export default comicModel;