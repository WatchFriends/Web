import { Series } from "./Series";

export class Page {
    constructor(
        public page: number,
        public results: Series[],
        public total_results: number,
        public total_pages: number
    ){}
}