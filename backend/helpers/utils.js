Array.prototype.random = function (max, repeat) { // @Jasper: de `=>` syntax geeft me een fout zie: http://stackoverflow.com/questions/41218673/keyword-this-gives-an-empty-object-in-prototype-of-array-node-js

    if (max) {
        let picked = [], rnd, length = this.length;
        if (!repeat && max > length) 
            throw new Error(`Cannot take ${max} random elements from an array of size ${length}`);
            
        for (; max--;) {
            rnd = Math.ceil(Math.random() * length - 1);

            if (!repeat && picked.indexOf(rnd)) {
                max++;
            }
            else {
                picked.push(this[rnd]);
            }
        }
        return picked;
    }
    else {
        return this[Math.ceil(Math.random() * this.length - 1)];
    }
};

module.exports = {
    uid: number => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".random(number, true).join()
};