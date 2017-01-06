import { Series } from "./Series";

export class Page {
    constructor(
        public page: Number,
        public results: Series[],
        public total_results: Number,
        public total_pages: Number
    ){}
}