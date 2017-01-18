export class WFEvent {
    constructor(public userId: string,
                public userName: string,
                public message: string,
                public url: string,
                public time: Date) {
    }
}
