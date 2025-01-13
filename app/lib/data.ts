const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  };

export async function getRatedMovies() {
   try{
    const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
    const data = await res.json();
    return data.results;
   } catch(err) {
    console.error('fetching error: ',err);
    throw new Error("Failed to fetch rated movies.");
   }
}