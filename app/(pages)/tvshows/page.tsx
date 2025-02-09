import { Card } from "@/app/components/card/card";
import { SearchBar } from "@/app/components/searchbar/searchbar";
import { getShows } from "@/app/lib/data";
import { TvShow } from "@/app/lib/types";

export default async function TvShows({ searchParams }: { searchParams: { query?: string } }) {
    const shows = await getShows();
    const query = searchParams?.query || "";
    const filteredShows = shows.filter((show: TvShow) => show.name.toLowerCase().includes(query.toLowerCase()));
    
    return(
        <>
                    <SearchBar placeholder="Search for media" />
                    <section className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                        <h2 className="text-4xl font-extrabold dark:text-white">Search Results</h2>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredShows.map((show: TvShow) => (
                                <Card data={show} key={show.id} />
                            ))}
                        </div>
                    </section>
                </>
    )
}