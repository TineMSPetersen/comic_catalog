import { assets } from "./assets/assets";

const App = () => {
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
        <section className="grid grid-cols-[1fr_3fr] gap-5 py-4 px-10 bg-white rounded-3xl items-center outline-1 outline-black">
          <img src="https://cdn2.penguin.com.au/covers/original/9781401297244.jpg" />
          <section className="flex flex-col justify-center gap-5">
            <section className="flex flex-col gap-2 md:flex-row justify-between">
              <section>
                <h2 className="text-xl">Batman: Hush</h2>
                <p className="text-sm">Jeph Loeb - Jim Lee - Scot Williams</p>
              </section>
              <section className="flex gap-2 items-center">
                  <img className="cursor-pointer" src={assets.star} width={30} />
                <section className="flex py-1 px-2 bg-blue-300 rounded-xl gap-2 items-center outline-1 outline-blue-950 text-blue-950 cursor-pointer">
                  <img src={assets.openBook} width={20} />
                  <p>Reading</p>
                </section>
                </section>
              </section>
              <section className="flex gap-2 items-center">
                <section className="w-full h-3 bg-gray-300 rounded-3xl">
                  <section className="w-12 h-3 bg-blue-300 rounded-3xl"></section>
                </section>
                <p className="min-w-12.5 text-sm">2 / 12</p>
              </section>
              <section className="flex flex-wrap gap-2">
                <button className="bg-gray-300 py-2 px-4 rounded-2xl text-sm cursor-pointer outline-1 outline-black">
                  <p>-1 Chapter</p>
                </button>
                <button className="bg-gray-300 py-2 px-4 rounded-2xl text-sm cursor-pointer outline-1 outline-black">
                  <p>+1 Chapter</p>
                </button>
                <button className="bg-black text-white py-2 px-4 rounded-2xl text-sm cursor-pointer outline-1 outline-black">
                  <p>Mark Complete</p>
                </button>
              </section>
            </section>
          </section>
        
        <section className="grid grid-cols-[1fr_3fr] gap-5 py-4 px-10 bg-white rounded-3xl items-center outline-1 outline-black">
          <img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1636210417i/59553021.jpg" />
          <section className="flex flex-col justify-center gap-5">
            <section className="flex flex-col gap-2 md:flex-row justify-between">
              <section>
                <h2 className="text-xl">Robin & Batman<span className="text-gray-600"> (2021-)</span></h2>
                <p className="text-sm">Jeff Lemire - Dustin Nguyen</p>
              </section>
              <section className="flex gap-2 items-center">
                  <img className="cursor-pointer" src={assets.star} width={30} />
                <section className="flex py-1 px-2 bg-green-300 rounded-xl gap-2 items-center outline-1 outline-green-950 text-green-950 cursor-pointer">
                  <img src={assets.book} width={20} />
                  <p>Complete</p>
                </section>
                </section>
              </section>
              <section className="flex gap-2 items-center">
                <section className="w-full h-3 bg-gray-300 rounded-3xl">
                  <section className="w-full h-3 bg-green-300 rounded-3xl"></section>
                </section>
                <p className="min-w-12.5 text-sm">3 / 3</p>
              </section>
              <section className="flex flex-wrap gap-2">
                <button className="bg-gray-300 py-2 px-4 rounded-2xl text-sm cursor-pointer outline-1 outline-black">
                  <p>-1 Chapter</p>
                </button>
                <button className="bg-gray-300 py-2 px-4 rounded-2xl text-sm cursor-pointer outline-1 outline-black opacity-45">
                  <p>+1 Chapter</p>
                </button>
              </section>
            </section>
          </section>
      </main>
    </div>
  );
};

export default App;
