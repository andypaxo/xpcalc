var repo = new (function() {

    // General ------------------------------------------------------

    this.storage = window.localStorage;

    this.store = function (id, data) {
        var datatype = Object.prototype.toString.call(data);
        if (datatype === '[object Object]' || datatype === '[object Array]') {
            data = JSON.stringify(data);
        }
        this.storage.setItem(id, data);
    };

    this.fetch = function (id) {
        var data = this.storage.getItem(id);
        var firstChar = (data || ' ')[0], lastChar = (data || ' ').substr(-1, 1);
        if (data != null && ((firstChar === '{' && lastChar === '}') || (firstChar === '[' && lastChar === ']'))) {
            data = JSON.parse(data);
        }
        return data;
    };

    this.erase = function (id) {
        this.storage.removeItem(id);
    };

    // xpcalc specific ----------------------------------------------

    this.startCampaign = function (campaign) {
        var id = util.makeId();
        campaign.id = id;
        this.store('campaign-' + id, campaign);
        return campaign;
    };

    // Migrations ---------------------------------------------------

    if (!this.fetch('data-version'))
        this.store('data-version', '1');

})();