export class FollowedSeries {
    constructor(
        public user: string,
        public seriesId: number,
        public following: boolean,
        public rating: number,
    ) { }
}
