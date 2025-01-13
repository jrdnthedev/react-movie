import { Card } from "./components/card/card";
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
      <h1>Top Rated Movies</h1>
      <div>
        {data.map((movie: Movie) => (
          <Card data={movie} key={movie.id} />
        ))}
      </div>
    </main>
   </>
  );
}
