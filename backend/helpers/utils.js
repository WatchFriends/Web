Array.prototype.random = function (max) { // @Jasper: de `=>` syntax geeft me een fout zie: http://stackoverflow.com/questions/41218673/keyword-this-gives-an-empty-object-in-prototype-of-array-node-js
        
    if (max) {
        let picked = [], rnd;

        for (let counter = max; counter--;) { // zou dat werken zo?
            rnd = Math.ceil(Math.random() * this.length - 1);
            
            if (picked.indexOf(rnd) >= 0) {
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
    uid: number => {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".random(number).join(""); 
    }
};