import { Series } from './series';

export class Page<T> {
    constructor(
        public page: number,
        public results: T[],
        public total_results: number,
        public total_pages: number
    ) { }
}
