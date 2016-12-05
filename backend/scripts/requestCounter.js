let requestCounter = (()=> {
    let counter = 0;
    return {
        getCount: cb => cb(null, ++counter)
    };
})();

module.exports = requestCounter;