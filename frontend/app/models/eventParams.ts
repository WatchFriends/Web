export class EventParams {
    constructor(
        public follow: boolean,
        public watch: boolean,
        public friendId: string,
        public seriesId: number,
        public seasonId: number,
        public episodeId: number,
        public rating: number
    ) { }
}
