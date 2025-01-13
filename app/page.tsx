import { Card } from "./components/card/card";
import { Footer } from "./components/footer/footer";
import { NavBar } from "./components/navbar/navbar";
import { getRatedMovies } from "./lib/data";
import { Movie } from "./lib/types";


export default async function Home() {
  const data = await getRatedMovies();
  console.log(data);

  return (
   <>
     <NavBar />
     <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-extrabold dark:text-white"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Top Rated Movies</span></h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((movie: Movie) => (
          <Card data={movie} key={movie.id} />
        ))}
      </div>
    </main>
    <Footer />
   </>
  );
}
