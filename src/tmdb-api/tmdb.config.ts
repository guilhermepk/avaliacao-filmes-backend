import axios, { AxiosResponse } from 'axios';
import { MoviesType } from './models/types/movies.type';

const api = axios.create({
    baseURL: `${process.env.TMDB_URL}`,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
});

async function get(url: string){
    return await api.get(url);
}

export async function getMovies(){
    // return await get('3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc');
    // const response: AxiosResponse<MoviesType> = await get('3/discover/movie?language=pt-BR');
    // const movies = response.data.results.map(result => ({ title: result.title, overview: result.overview }));
    // return movies;

    // return await api.get('/tv/48891?language=pt-BR')
    //     .then(response => response.data)
    //     .catch(e => console.error(e.response.data))

    // return await api.get('genre/movie/list?language=pt-BR')
    //     .then(response => response.data)
    //     .catch(e => console.error(e.response.data))
}
// 48891 brooklyn 99