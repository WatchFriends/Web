import { FollowedSeries } from './followed-series';

export class Page {
    constructor(
        public page: number,
        public results: FollowedSeries[],
        public total_results: number,
        public total_pages: number
    ) { }
}
