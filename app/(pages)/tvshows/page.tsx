import { SearchBar } from "@/app/components/searchbar/searchbar";

export default async function TvShows({ searchParams }: { searchParams: { query?: string } }) {
    const query = searchParams?.query || "";
    
    return(
        <>
            <h2 className="text-4xl font-extrabold dark:text-white">Tv Show Page</h2>
            <SearchBar placeholder="Search for media" />
        </>
    )
}