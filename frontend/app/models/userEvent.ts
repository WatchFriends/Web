import {EventParams} from "./eventParams";

export class UserEvent {
    constructor(
        public userId: string,
        public userName: string,
        public params: EventParams[],
        public time: Date
    ) { }
}
