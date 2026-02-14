import express from "express"
import { addComic, changeStatus, chapterCount, listComics, setFavorite } from "../controllers/comicController.ts"

const comicRouter = express.Router();

comicRouter.post('/addcomic', addComic);
comicRouter.get('/listcomics', listComics);
comicRouter.post('/chaptercount', chapterCount);
comicRouter.post('/setfavorite', setFavorite)
comicRouter.post('/changestatus', changeStatus)

export default comicRouter