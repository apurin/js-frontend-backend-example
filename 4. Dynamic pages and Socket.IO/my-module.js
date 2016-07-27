module.exports = {
    square: function (n)
    {
        return n * n;
    },      
    waitOneSecond: function (callback) {
        setTimeout(callback, 1000);
    }
};