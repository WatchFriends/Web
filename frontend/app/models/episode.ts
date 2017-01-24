export class Episode {
    constructor(
        public id: number,
        public air_date: string,
        public episode_number: number,
        public name: string,
        public overview: string,
        public still_path: string,
        public season_number: number,
        public watched: boolean
    ) { }
}
