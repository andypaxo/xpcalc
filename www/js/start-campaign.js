(function() {
    var generateCampaignName = function () {
        var places = ['Tower', 'Caves', 'Forest', 'Crypt', 'Halls', 'Temple', 'Hand', 'Portal', 'Tome'];
        var descriptors = ['Doom', 'the Ancients', 'Terror', 'Mystery', 'Destiny', 'Secrets', 'Darkness'];

        return 'The ' + util.randomItemFrom(places) + ' of ' + util.randomItemFrom(descriptors);
    };

    window.onload = function () {
        document.getElementById('txt-campaign-name').setAttribute('value', generateCampaignName());
        document.getElementById('txt-campaign-name').select();
    };

    document.getElementById('form-start-campaign').onsubmit = function () {
        var campaignName = document.getElementById('txt-campaign-name').getAttribute('value');
        var campaign = repo.startCampaign({name: campaignName});
        document.location.replace('campaign.html?id=' + campaign.id);
        return false;
    };
})();