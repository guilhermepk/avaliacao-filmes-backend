export type MovieContentType = {
    "adult": boolean,
    "backdrop_path"?,
    "belongs_to_collection"?,
    "budget": number,
    "genres": Array<{
        "id": number,
        "name": string
    }>,
    "homepage": string,
    "id": number,
    "imdb_id": string,
    "origin_country": Array<string>,
    "original_language": string,
    "original_title": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "production_companies": Array<{
        "id": number,
        "logo_path"?,
        "name": string,
        "origin_country": string
    }>,
    "production_countries": Array<{
        "iso_3166_1": string,
        "name": string
    }>,
    "release_date": string,
    "revenue": number,
    "runtime": number,
    "spoken_languages": Array<any>,
    "status": string,
    "tagline": string,
    "title": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number
}