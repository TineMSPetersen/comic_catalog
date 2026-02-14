import { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "./assets/assets";

const App = () => {
  const [ list, setList ] = useState<Comic[]>([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  interface Comic {
    _id: string;
    title: string;
    author: string[];
    picture: string;
    favorite: boolean;
    status: string;
    chapterCount: number;
    currentChapter: number;
  }

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/comic/listcomics`);
      console.log(response)

      if (response.data.success) {
        setList(response.data.comics);
      }
    } catch (error : any) {
      console.log(error);
    }
  };

  const changeCurrentChapter = async (comicId: string, chapterCount: number, currentChapter: number) => {
    try {
      const response = await axios.post(`${backendUrl}/api/comic/chaptercount`, {comicId, chapterCount, currentChapter})

      if (response.data.success) {
        fetchList();
      }

    } catch (error) {
      console.log(error);
    }
  }

  const changeFavorite = async (comicId: string) => {
    try {
      const response = await axios.post(`${backendUrl}/api/comic/setfavorite`, {comicId})

      if (response.data.success) {
        fetchList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const calculateProgress = (sum: number, current: number) => {
    if (sum === 0) return 0;
  return Math.round((current / sum) * 100);
  }


  return (
    <div className="bg-gray-100 w-full h-screen px-10 py-5">
      <div className="flex justify-end">
        <section className="flex items-center gap-2 bg-white outline-1 outline-black rounded-2xl max-w-fit px-4 py-2 cursor-pointer">
          <img src={assets.star} alt="" /> <p>Favorites</p>
        </section>
      </div>

      <header className="flex flex-col gap-2 mb-5">
        <section className="flex gap-2">
          <img src={assets.book} alt="" />
          <h1 className="text-3xl">Comic Catalog</h1>
        </section>
        <section className="bg-gray-300 px-2 py-2 outline-1 outline-black rounded-2xl flex flex-wrap gap-2 justify-center">
          <button className="flex items-center gap-2 bg-white outline-1 outline-black rounded-2xl max-w-fit px-4 py-2 cursor-pointer">
            <p>All</p>
            <section className="bg-gray-300 rounded-full px-2 py-1">
              <p>10</p>
            </section>
          </button>

          <button className="flex items-center gap-2 bg-white outline-1 outline-black rounded-2xl max-w-fit px-4 py-2 cursor-pointer">
            <p>Reading</p>
            <section className="bg-gray-300 rounded-full px-2 py-1">
              <p>10</p>
            </section>
          </button>

          <button className="flex items-center gap-2 bg-white outline-1 outline-black rounded-2xl max-w-fit px-4 py-2 cursor-pointer">
            <p>On Hold</p>
            <section className="bg-gray-300 rounded-full px-2 py-1">
              <p>10</p>
            </section>
          </button>

          <button className="flex items-center gap-2 bg-white outline-1 outline-black rounded-2xl max-w-fit px-4 py-2 cursor-pointer">
            <p>Done</p>
            <section className="bg-gray-300 rounded-full px-2 py-1">
              <p>10</p>
            </section>
          </button>

          <button className="flex items-center gap-2 bg-white outline-1 outline-black rounded-2xl max-w-fit px-4 py-2 cursor-pointer">
            <p>Later</p>
            <section className="bg-gray-300 rounded-full px-2 py-1">
              <p>10</p>
            </section>
          </button>
        </section>
      </header>

      <main className="flex flex-col gap-5">
        {list.map((item, index) => (
        <section key={index} className="grid grid-cols-[1fr_3fr] gap-5 py-4 px-10 bg-white rounded-3xl items-center outline-1 outline-black">
          <img src={item.picture} />
          <section className="flex flex-col justify-center gap-5">
            <section className="flex flex-col gap-2 md:flex-row justify-between">
              <section>
                <h2 className="text-xl">{item.title}</h2>
                <p className="text-sm">
                  {item.author.map((item, index) => (
                    <span>{item[index] === item[0] ? "" : " - "}{item}</span> 
                  ))}
                  </p>
              </section>
              <section className="flex gap-2 items-center">
                  <img onClick={() => changeFavorite(item._id)} className="cursor-pointer" src={item.favorite === true ? assets.starFilled : assets.starOutline} width={30} />
                <section className={`flex py-1 px-2  rounded-xl gap-2 items-center outline-1 ${item.status === "Complete" ? "bg-green-300 outline-green-950 text-green-950" : "bg-blue-300 outline-blue-950 text-blue-950"}`}>
                  <img src={item.status === "Complete" ? assets.openBook : assets.book} width={20} />
                  <p>{item.status}</p>
                </section>
                </section>
              </section>
              <section className="flex gap-2 items-center">
                <section className="w-full h-3 bg-gray-300 rounded-3xl">
                  <section className={`h-3 rounded-3xl ${item.status === "Complete" ? "bg-green-300" : "bg-blue-300"}`} style={{ width: `${calculateProgress(item.chapterCount, item.currentChapter)}%`}}></section>
                </section>
                <p className="min-w-12.5 text-sm">{item.currentChapter} / {item.chapterCount}</p>
              </section>
              <section className="flex flex-wrap gap-2">
                <button onClick={() => changeCurrentChapter(item._id, item.chapterCount, item.currentChapter-1)} className={`bg-gray-300 py-2 px-4 rounded-2xl text-sm outline-1 outline-black ${item.currentChapter === 0 ? "opacity-45" : "cursor-pointer"}`}>
                  <p>-1 Chapter</p>
                </button>
                <button onClick={() => changeCurrentChapter(item._id, item.chapterCount, item.currentChapter+1)} className={`bg-gray-300 py-2 px-4 rounded-2xl text-sm outline-1 outline-black ${item.currentChapter === item.chapterCount ? "opacity-45" : "cursor-pointer"}`}>
                  <p>+1 Chapter</p>
                </button>
                {item.status != "Complete" && <button onClick={() => changeCurrentChapter(item._id, item.chapterCount, item.chapterCount)} className="bg-black text-white py-2 px-4 rounded-2xl text-sm cursor-pointer outline-1 outline-black">
                  <p>Mark Complete</p>
                </button>}
                
              </section>
            </section>
          </section>
      ))}
      </main>
    </div>
  );
};

export default App;
