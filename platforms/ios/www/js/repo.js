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

    this.eraseItemFromList = function(params) {
        var list = this.fetch(params.listId) || [];
        var itemId = params.itemId;
        var index = util.indexOfMatch(list, function (itemToMatch) { return itemToMatch.id === itemId; });
        list.splice(index, 1);
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

    // Undo ---------------------------------------------------------

    this.setUndoState = function(params) {
        this.store('undo-state', {
            id: params.objectId,
            data: this.fetch(params.objectId),
            message: params.message
        });
    };

    this.getUndoState = function() {
        return this.fetch('undo-state');
    };

    this.restoreUndoState = function(stateToRestore) {
        var undoState = stateToRestore || this.getUndoState();
        this.store(undoState.id, undoState.data);
        this.clearUndoState();
    };

    this.clearUndoState = function() {
        this.erase('undo-state');
    };

    // Migrations ---------------------------------------------------

    if (!this.fetch('data-version'))
        this.store('data-version', '1');

})();