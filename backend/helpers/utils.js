Array.prototype.random = function (max, repeat) {

    if (max) {
        let picked = [], rnd, length = this.length;
        if (!repeat && max > length) 
            throw new Error(`Cannot take ${max} random elements from an array of size ${length}`);
        while (max--) {
            rnd = Math.floor(Math.random() * length);

            if (repeat || picked.indexOf(this[rnd]) < 0) { 
                picked.push(this[rnd]);
            }
            else {
                max++; //het element zit al in picked, en repeat is falsy
            }
        }
        return picked;
    }
    else {
        return this[Math.floor(Math.random() * length)];
    }
};

module.exports = {
    uid: number => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".random(number, true).join()