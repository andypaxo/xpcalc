var util = {
    randomItemFrom : function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    makeId : function (type) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        var id = type;
        for (j = 0; j < 3; j++) {
            id += '-';
            for (i = 0; i < 4; i++)
                id += this.randomItemFrom(chars);
        }
        return id;
    },

    getQueryStringParam : function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    makeAtLeast : function (number, atLeast) {
        number = Number(number);
        return Number.isNaN(number) ? atLeast : Math.floor(Math.max(number, atLeast));
    },

    indexOfMatch : function(list, matcher) {
        for (var i = 0; i < list.length; i++)
            if (matcher(list[i]))
                return i;
        return -1;
    },

    findInput : function(parentElement, name) {
        return Array.prototype.filter.call(
            parentElement.children,
            function (elem) { return elem.getAttribute('name') === name; }
        )[0];
    }
};