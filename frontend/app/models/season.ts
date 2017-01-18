import { Episode } from './episode';
export class Season {
    constructor(
        public id: number,
        public air_date: string,
        public episodes: Episode[],
        public name: string,
        public overview: string,
        public poster_path: string,
        public season_number: number,
        public episode_count: number
    ) { }
}
