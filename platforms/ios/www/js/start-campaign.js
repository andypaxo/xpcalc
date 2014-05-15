(function() {
    var campaignId;

    var generateCampaignName = function () {
        var places = ['Tower', 'Caves', 'Forest', 'Crypt', 'Halls', 'Temple', 'Hand', 'Portal', 'Tome'];
        var descriptors = ['Doom', 'the Ancients', 'Terror', 'Mystery', 'Destiny', 'Secrets', 'Darkness'];

        return 'The ' + util.randomItemFrom(places) + ' of ' + util.randomItemFrom(descriptors);
    };

    document.getElementById('form-start-campaign').onsubmit = function () {
        var campaignName = document.getElementById('txt-campaign-name').value;

        if (campaignName === 'run specs') {
            document.location = 'spec.html';
            return false;
        }

        var campaign = (campaignId
            ? repo.store(campaignId, {
                id : campaignId,
                name : campaignName
            })
            : repo.startCampaign({name: campaignName}));
        document.location.replace('campaign.html?id=' + campaign.id);
        return false;
    };

    window.onload = function () {        
        campaignId = util.getQueryStringParam('campaignId');
        if (campaignId) {
            var campaign = repo.fetch(campaignId);
            document.getElementById('btn-start').innerText = 'Save';
            document.getElementById('txt-campaign-name').value = campaign.name;
        }
        else {
            document.getElementById('txt-campaign-name').value = generateCampaignName();
        }

        document.getElementById('txt-campaign-name').select();
    };
})();