module.exports = {
    uid: number => {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".random(number).join(""); 
    }
};