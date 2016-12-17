module.exports = {
    uid: number => {
        var buff = [],
            chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            charlen = chars.length;
        for(var i = 0; i < number; i++)
            buf.push(chars[randomNumber(charlen)]);
        return buf.join("");
    },
    randomNumber: max => {
        return Math.ceil(Math.random() * max - 1);
    }
};