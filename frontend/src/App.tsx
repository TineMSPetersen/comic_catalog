import { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "./assets/assets";

const App = () => {
  const [list, setList] = useState<Comic[]>([]);
  const [filter, setFilter] = useState("All");

  const statusConfig = {
    Complete: {
      bg: "bg-green-300",
      outline: "outline-green-950",
      text: "text-green-950",
      icon: assets.openBook,
    },
    Reading: {
      bg: "bg-blue-300",
      outline: "outline-blue-950",
      text: "text-blue-950",
      icon: assets.book,
    },
    Paused: {
      bg: "bg-yellow-300",
      outline: "outline-yellow-950",
      text: "text-yellow-950",
      icon: assets.pause,
    },
    Later: {
      bg: "bg-purple-300",
      outline: "outline-purple-950",
      text: "text-purple-950",
      icon: assets.clock,
    },
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  interface Comic {
    _id: string;
    title: string;
    author: string[];
    picture: string;
    favorite: boolean;
    status: "Complete" | "Reading" | "Paused" | "Later";
    chapterCount: number;
    currentChapter: number;
  }

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/comic/listcomics`);

      if (response.data.success) {
        setList(response.data.comics);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const changeCurrentChapter = async (
    comicId: string,
    chapterCount: number,
    currentChapter: number,
  ) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/comic/chaptercount`,
        { comicId, chapterCount, currentChapter },
      );

      if (response.data.success) {
        fetchList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeFavorite = async (comicId: string) => {
    try {
      const response = await axios.post(`${backendUrl}/api/comic/setfavorite`, {
        comicId,
      });

      if (response.data.success) {
        fetchList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (comicId: string, status: string) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/comic/changestatus`,
        {
          comicId,
          status,
        },
      );

      if (response.data.success) {
        fetchList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const calculateProgress = (sum: number, current: number) => {
    if (sum === 0) return 0;
    return Math.round((current / sum) * 100);
  };

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
          <button
            onClick={() => setFilter("All")}
            className="flex items-center gap-2 bg-white outline-1 outline-black rounded-2xl max-w-fit px-4 py-2 cursor-pointer"
          >
            <p>All</p>
            <section className="bg-gray-300 rounded-full px-2 py-1">
              <p>{list.length}</p>
            </section>
          </button>

          <button
            onClick={() => setFilter("Reading")}
            className="flex items-center gap-2 bg-white outline-1 outline-black rounded-2xl max-w-fit px-4 py-2 cursor-pointer"
          >
            <p>Reading</p>
            <section className="bg-gray-300 rounded-full px-2 py-1">
              <p>{list.filter((item) => item.status === "Reading").length}</p>
            </section>
          </button>

          <button
            onClick={() => setFilter("Paused")}
            className="flex items-center gap-2 bg-white outline-1 outline-black rounded-2xl max-w-fit px-4 py-2 cursor-pointer"
          >
            <p>On Hold</p>
            <section className="bg-gray-300 rounded-full px-2 py-1">
              <p>{list.filter((item) => item.status === "Paused").length}</p>
            </section>
          </button>

          <button
            onClick={() => setFilter("Complete")}
            className="flex items-center gap-2 bg-white outline-1 outline-black rounded-2xl max-w-fit px-4 py-2 cursor-pointer"
          >
            <p>Done</p>
            <section className="bg-gray-300 rounded-full px-2 py-1">
              <p>{list.filter((item) => item.status === "Complete").length}</p>
            </section>
          </button>

          <button
            onClick={() => setFilter("Later")}
            className="flex items-center gap-2 bg-white outline-1 outline-black rounded-2xl max-w-fit px-4 py-2 cursor-pointer"
          >
            <p>Later</p>
            <section className="bg-gray-300 rounded-full px-2 py-1">
              <p>{list.filter((item) => item.status === "Later").length}</p>
            </section>
          </button>
        </section>
      </header>

      <main className="flex flex-col gap-5">
  {list
    .filter((item) => filter === "All" || item.status === filter)
    .map((item) => {
      const status = statusConfig[item.status];

      return (
        <section
          key={item._id}
          className="grid grid-cols-[1fr_3fr] gap-5 py-4 px-10 bg-white rounded-3xl items-center outline-1 outline-black"
        >
          <img src={item.picture} />

          <section className="flex flex-col justify-between gap-5">
            <section className="flex flex-col gap-2 md:flex-row justify-between">
              <section>
                <h2 className="text-xl">{item.title}</h2>
                <p className="text-sm">
                  {item.author.map((author, index) => (
                    <span key={index}>
                      {index === 0 ? "" : " - "}
                      {author}
                    </span>
                  ))}
                </p>
              </section>

              <section className="flex gap-2 items-center">
                <img
                  onClick={() => changeFavorite(item._id)}
                  className="cursor-pointer"
                  src={item.favorite ? assets.starFilled : assets.starOutline}
                  width={30}
                />

                <section
                  className={`flex py-1 px-2 rounded-xl gap-2 items-center outline-1 
                    ${status.bg} ${status.outline} ${status.text}`}
                >
                  <img src={status.icon} width={20} />
                  <p>{item.status}</p>
                </section>
              </section>
            </section>

            {item.status === "Later" ? (
              <section className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    changeStatus(item._id, "Reading");
                    changeCurrentChapter(item._id, item.chapterCount, 0);
                  }}
                  className="bg-black text-white py-2 px-4 rounded-2xl text-sm cursor-pointer outline-1 outline-black"
                >
                  Start Reading
                </button>
              </section>
            ) : (
              <>
                <section className="flex gap-2 items-center">
                  <section className={`w-full h-3 bg-gray-300 rounded-3xl ${item.status === "Paused" && "opacity-45"}`}>
                    <section
                      className={`h-3 rounded-3xl ${
                        item.status === "Complete"
                          ? "bg-green-300"
                          : "bg-blue-300"
                      }`}
                      style={{
                        width: `${calculateProgress(
                          item.chapterCount,
                          item.currentChapter
                        )}%`,
                      }}
                    />
                  </section>
                  <p className="min-w-12.5 text-sm">
                    {item.currentChapter} / {item.chapterCount}
                  </p>
                </section>

                {item.status === "Paused" ? (
                  <section className="flex flex-wrap gap-2">
                    <button
                      onClick={() => changeStatus(item._id, "Reading")}
                      className="bg-black text-white py-2 px-4 rounded-2xl text-sm cursor-pointer outline-1 outline-black"
                    >
                      Resume Reading
                    </button>
                  </section>
                ) : (
                  <section className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        changeCurrentChapter(
                          item._id,
                          item.chapterCount,
                          item.currentChapter - 1
                        )
                      }
                      className={`bg-gray-300 py-2 px-4 rounded-2xl text-sm outline-1 outline-black ${
                        item.currentChapter === 0 ? "opacity-45" : "cursor-pointer"
                      }`}
                    >
                      -1 Chapter
                    </button>

                    <button
                      onClick={() =>
                        changeCurrentChapter(
                          item._id,
                          item.chapterCount,
                          item.currentChapter + 1
                        )
                      }
                      className={`bg-gray-300 py-2 px-4 rounded-2xl text-sm outline-1 outline-black ${
                        item.currentChapter === item.chapterCount
                          ? "opacity-45"
                          : "cursor-pointer"
                      }`}
                    >
                      +1 Chapter
                    </button>

                    {item.status !== "Complete" && (
                      <button
                        onClick={() => changeStatus(item._id, "Complete")}
                        className="bg-black text-white py-2 px-4 rounded-2xl text-sm cursor-pointer outline-1 outline-black"
                      >
                        Mark Complete
                      </button>
                    )}
                  </section>
                )}
              </>
            )}

            {item.status !== "Complete" && (
              <section className="flex justify-end gap-2">
                {item.status !== "Paused" && item.status !== "Later" && (
                  <p
                    onClick={() => changeStatus(item._id, "Paused")}
                    className="text-gray-400 underline cursor-pointer"
                  >
                    Put On Hold
                  </p>
                )}

                {item.status !== "Later" && (
                  <p
                    onClick={() => changeStatus(item._id, "Later")}
                    className="text-gray-400 underline cursor-pointer"
                  >
                    Add to later
                  </p>
                )}
              </section>
            )}
          </section>
        </section>
      );
    })}
</main>
    </div>
  );
};

export default App;
