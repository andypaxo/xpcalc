(function () {
    var apiKey = '8cf4f7cd';

    var guidGenerator = function () {
        var S4 = function () {
          return Math.floor(Math.random() * 0x10000).toString(16);
        };

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };

    var getGuid = function () {
        if (window.device && window.device.uuid) {
            return window.device.uuid;
        }
        else if (window.localStorage) {
            var existingGuid = window.localStorage.getItem('device-uuid');
            if (existingGuid) {
                return existingGuid;
            }
            else {
                existingGuid = guidGenerator();
                window.localStorage.setItem('device-uuid', existingGuid);
                return existingGuid;
            }
        }
        
        return guidGenerator();
    };

    window.onerror = function (message, url, line, column, error) {
        var where = url.split('/').pop() + ':' + line;
        var trace = '';
        if (typeof(error) === 'object') {
          trace = error.stack;
        }

        var phone = 'android';
        var osver = '0.0';
        var uid = getGuid();
        var screenWidth = '';
        var screenHeight = ''; 
        try {
            if (window.device) {
                phone = window.device.model;
                osver = window.device.version;
            }
            screenWidth = window.screen.width.toString();
            screenHeight = window.screen.height.toString();
        }
        catch (e) {} // Don't throw errors in the error handler!

        var data = {
            client : {
                name : 'bugsense-android',
                version : '0.6'
            },
            request : {},
            exception : {
                message : message,
                where : where,
                backtrace : trace
            },
            application_environment: {
                phone : phone,
                appver : '0.0.3',
                appname : 'net.softwarealchemist.xpcalc',
                osver : osver,
                'screen_dpi(x:y)': '',
                'screen:width': screenWidth,
                'screen:height': screenHeight,
                uid : uid
            }
        };

        if (document.location.hostname === 'localhost') {
            console.log('Error handled:');
            console.log(data);
        }
        else {
            var request = new XMLHttpRequest();
            request.open('POST', 'https://www.bugsense.com/api/errors', true);
            request.setRequestHeader('x-bugsense-api-key', apiKey);
            request.send(JSON.stringify(data));
        }
    };

    var getLocation = function () {
        try {
            return document.location.pathname.split('.')[0].substr(1);
        } catch (e) {
            return '';
        }
    };

    var getScreen = function () {
        try {
            return window.screen.width + 'x' + window.screen.height;
        } catch (e) {
            return '';
        }
    };

    var buildQueryString = function(parameters) {
        var qs = '';
        for(var key in parameters) {
            var value = parameters[key];
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
        if (qs.length > 0) {
            qs = qs.substring(0, qs.length-1)
        }
        return qs;
    };

    (function sendAnalytics() {
        if (document.location.hostname === 'localhost') {
            return;
        }
        
        var request = new XMLHttpRequest();
        request.open('POST', 'https://ssl.google-analytics.com/collect', true);
        var data = {
            'v'  : 1,
            'tid': 'UA-45015374-1',
            'cid': getGuid(),
            't'  : 'appview',
            'an' : 'D%26D%203.5%20XP%20Calculator',
            'av' : '0.0.3',
            'cd' : getLocation(),
            'sr' : getScreen()
        };
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                console.log('Analytics request status  : ' + request.status);
                console.log('Analytics request response: ' + request.responseText);
            }
        };
        request.send(buildQueryString(data));
    })();
})();