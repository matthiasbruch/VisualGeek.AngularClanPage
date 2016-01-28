var colors = require('colors');

var logHelper = function() {
    
    var logError = function(message) {
        console.log(new Date() + (message || '').red);
    };
    
    var logWarning = function(message) {
        console.log(new Date() + (message || '').orange);
    };
    
    var logInfo = function(message) {
        console.log(new Date() + (message || '').green);
    };

    return {
        logError: logError,
        logWarning: logWarning,
        logInfo: logInfo
    };
}();

module.exports = logHelper;