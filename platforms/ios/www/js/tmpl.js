var tmpl = {
    replaceStrings : function (params) {
        var input = params.input;
        var obj = params.obj;

        var makeSafe = function (str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        };

        var exp = /@([\w]+)/g;
        var match;
        while (match = exp.exec(input)) {
            var value = makeSafe(obj[match[1]].toString());
            input = input.replace(match[0], value);
            exp.lastIndex = 0; // Always start from the start
        }

        return input;
    },

    build : function(params) {
        var input = params.input;
        var objects = params.objects;
        var parentElem = params.element;

        var contents = objects.map(function (obj) {
            return tmpl.replaceStrings({input:input, obj:obj});
        });
        parentElem.innerHTML = contents.join('');

        return parentElem;
    }
};