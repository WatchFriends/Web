module.exports = {
    uid: number => {
        var buff = [],
            chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            charlen = chars.length;
        for(var i = 0; i < number; i++)
            buf.push(chars[Math.floor(Math.random*charlen)]);
        return buf.join("");
    }
};