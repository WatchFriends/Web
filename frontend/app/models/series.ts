import {Creator} from './creator';
import {Genre} from './genre';
import {Network} from './network';
import {ProductionCompany} from './productionCompany';
import {Season} from './season';

export class Series {
    constructor(
        public backdrop_path: string,
        public created_by: Creator[],
        public episode_run_time: number[],
        public first_air_date: string,
        public genres: Genre[],
        public homepage: string,
        public id: number,
        public in_production: boolean,
        public languages: string[],
        public last_air_date: string,
        public name: string,
        public networks: Network[],
        public number_of_episodes: number,
        public number_of_seasons: number,
        public origin_country: string[],
        public original_language: string,
        public original_name: string,
        public overview: string,
        public popularity: number,
        public poster_path: string,
        public production_companies: ProductionCompany[],
        public seasons: Season[],
        public status: string,
        public type: string,
        public vote_average: number,
        public vote_count: number
        //public similar: Similar[]
    ) {}
}