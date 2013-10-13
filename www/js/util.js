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
    }
};