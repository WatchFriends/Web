import {WFEvent} from "./wfevent";

export class WFEventsPage {
    constructor(public docs: WFEvent[],
                public total: number,
                public limit: number,
                public page: string,
                public pages: number) {
    }
}
