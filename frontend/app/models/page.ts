import { Series } from './series';

export class Page<T> {
    constructor(
        public page: number,
        public results: T[],
        public totalResults: number,
        public totalPages: number
    ) { }
}
