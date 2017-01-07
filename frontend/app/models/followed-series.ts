import { Series } from './series';

export class FollowedSeries {
    constructor(
        public series: Series,
        public following: boolean,
        public rating: number,
    ) { }
}
