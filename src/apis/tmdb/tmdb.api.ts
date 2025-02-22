import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TvContentType } from './models/types/tv-content.type';
import { MovieContentType } from './models/types/movie-content.type';
import { HttpException } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

const api = axios.create({
    baseURL: `${process.env.TMDB_URL}`,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
});

async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await api.get<T>(url, config).then((response: AxiosResponse<T>) => response.data)
        .catch(error => {
            if (error.status) throw new HttpException(error.response.data.status_message, error.status)
            else throw error;
        });
}

export async function getMovieById(id: number): Promise<MovieContentType> {
    const params = {
        language: 'pt-BR'
    };

    return await get<MovieContentType>(`movie/${id}`, { params })
}

export async function getTvShowById(id: number): Promise<TvContentType> {
    const params = {
        language: 'pt-BR'
    };

    return await get<TvContentType>(`tv/${id}`, { params });
}