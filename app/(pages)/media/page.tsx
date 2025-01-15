import { SearchBar } from "@/app/components/searchbar/searchbar";

export default function Media({ searchParams }: { searchParams: { query?: string } }) {
    return(
        <>
            <h1 className="">Media Page</h1>
            <SearchBar placeholder="Search for media" />
        </>
    )
}