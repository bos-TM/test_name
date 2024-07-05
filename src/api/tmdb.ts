import configuration from "../configuration";

async function get<TBody>(relativeUrl: string): Promise<TBody>{
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${configuration.apiToken}`
        }
    };
    
    const response = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
        options
    );
    const value: TBody = await response.json();

    return value;
}


export interface MovieDatails{
    id: number;
    title: string;
    popularity: number;
    overview: string;
    backdrop_path?: string | null;
}

interface PageResponse<TResult> {
    page: number;
    results: TResult[];
}

interface Configuration{
    images: {
        base_url: string;
    }
}

export const client = {
  async getConfiguration() {
    return await get<Configuration>("/configuration");
  },
  async getNowPlaing(): Promise<MovieDatails[]> {
    const response = await get<PageResponse<MovieDatails>>("/movie/now_playing");
    return response.results;
  },
};