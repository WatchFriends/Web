let requestCounter = (function () {
    let counter = 0;

    let getCount = function (cb) {
        cb(null, ++counter);
    };

    return {
        getCount: getCount
    };
})();

module.exports = requestCounter;