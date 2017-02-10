import { Series, Page } from './';

export class List extends Page<Series> {
    constructor(
        results: Series[],
        page: number,
        totalPages: number,
        totalResults: number,
        public name: string,
        public apiRequest: string
    ) {
        super(page, results, totalResults, totalPages);
    }
}
