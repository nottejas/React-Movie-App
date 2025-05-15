// const API_KEY = "e547e17d4e91f3e62a571655cd1ccaff"
const API_KEY = "791ad8837a7e8dbc2e6cbd4363c9423d"
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json();
    return data.results
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
    )}`)
    const data = await response.json();
    return data.results
}