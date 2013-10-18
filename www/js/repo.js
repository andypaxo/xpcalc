var repo = new (function() {

    // General ------------------------------------------------------

    var storage = window.localStorage;

    this.store = function (id, data) {
        var datatype = Object.prototype.toString.call(data);
        var dataToStore = ((datatype === '[object Object]' || datatype === '[object Array]')
            ? JSON.stringify(data)
            : data);
        storage.setItem(id, dataToStore);
        return data;
    };

    this.fetch = function (id) {
        var data = storage.getItem(id);
        var firstChar = (data || ' ')[0], lastChar = (data || ' ').substr(-1, 1);
        if (data != null && ((firstChar === '{' && lastChar === '}') || (firstChar === '[' && lastChar === ']'))) {
            data = JSON.parse(data);
        }
        return data;
    };

    this.erase = function (id) {
        storage.removeItem(id);
    };

    // xpcalc specific ----------------------------------------------

    this.storeItemToList = function (params) {
        var list = this.fetch(params.listId) || [];
        var item = params.item;
        var index = util.indexOfMatch(list, function (itemToMatch) { return itemToMatch.id === item.id; });
        if (index >= 0)
            list.splice(index, 1, item);
        else
            list.unshift(item);
        this.store(params.listId, list);
    };

    this.startCampaign = function (campaign) {
        var id = util.makeId('campaign');
        campaign.id = id;
        this.store(id, campaign);

        var campaignListing = this.fetch('campaign-listing') || [];
        campaignListing.push(id);
        this.store('campaign-listing', campaignListing);

        return campaign;
    };

    this.getCharacter = function (campaignId, characterId) {
        var chars = this.fetch(campaignId.replace('campaign', 'characters'));
        return chars.filter(function (character) { return character.id === characterId; })[0];
    };

    // Migrations ---------------------------------------------------

    if (!this.fetch('data-version'))
        this.store('data-version', '1');

})();