import { FollowedSeries } from './';

export class List {
    constructor(
        public name: string,
        public series: FollowedSeries[],
        public apiRequest: string,
        public page: number,
        public totalPages: number
    ) { }
}
