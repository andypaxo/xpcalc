var util = {
    randomItemFrom : function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    makeId : function () {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        var id = '';
        for (j = 0; j < 3; j++) {
            for (i = 0; i < 4; i++) {
                id += this.randomItemFrom(chars);
            }
            id += j == 2 ? '' : '-';
        }
        return id;
    }
};