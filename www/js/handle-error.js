(function () {
    var apiKey = '8cf4f7cd';

    var guid_generator = function () {
        var S4 = function () {
          return Math.floor(
                  Math.random() * 0x10000 /* 65536 */
              ).toString(16);
        };

        return (
            S4() + S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + S4() + S4()
        );
    };

    window.onerror = function (message, url, line, column, error) {
        var where = url.split('/').pop() + ':' + line;
        var trace = '';
        if (typeof(error) === 'object') {
          trace = error.stack;
        }

        var phone = 'android';
        var osver = '0.0';
        var uid = guid_generator();
        var screenWidth = '';
        var screenHeight = '';
        try {
            if (window.device) {
                phone = window.device.model;
                osver = window.device.version;
                uid = window.device.uuid;
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
                appver : '0.1',
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
            request.open('POST', 'http://www.bugsense.com/api/errors', true);
            request.setRequestHeader('x-bugsense-api-key', apiKey);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    console.log('Bugsense request status  : ' + request.status);
                    console.log('Bugsense request response: ' + request.responseText);
                }
            };
            request.send(JSON.stringify(data));
        }
    };
})();