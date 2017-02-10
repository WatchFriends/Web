export class Follower {
    constructor(
        public userId: string,
        public followerId: string,
        public since: Date
    ) { }
}
