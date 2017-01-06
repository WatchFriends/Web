import { Series } from "./Series";

export class List {
    constructor(
        public name: String,
        public series: Series,
        public apiRequest: String
    ){}
}