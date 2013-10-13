(function() {
    var generateCampaignName = function () {
        var places = ['Tower', 'Caves'];
        var descriptors = ['Doom', 'the Ancients'];

        return 'The ' + util.randomItemFrom(places) + ' of ' + util.randomItemFrom(descriptors);
    };

    window.onload = function () {
        document.getElementById('txt-campaign-name').setAttribute('value', generateCampaignName());
        document.getElementById('txt-campaign-name').click();
    };

    document.getElementById('form-start-campaign').onsubmit = function () {
        var campaignName = document.getElementById('txt-campaign-name').getAttribute('value');
        var campaign = repo.startCampaign({name: campaignName});
        document.location = 'campaign?id=' + campaign.id;
        return false;
    };
})();