(function() {
    var generateCampaignName = function () {
        var places = ['Tower', 'Caves'];
        var descriptors = ['Doom', 'the Ancients'];

        return 'The ' + util.randomItemFrom(places) + ' of ' + util.randomItemFrom(descriptors);
    };

    document.getElementById('btn-add-campaign').onclick = function () {
        document.location = 'start-campaign.html';
    };

    var campaignListing = repo.fetch('campaign-listing') || [];
    var listing = document.getElementById('list-campaigns');
    campaignListing.forEach(function (id) {
        var campaign = repo.fetch(id);
        var elem = document.createElement('li');
        
        console.log(campaign.name);
    });
})();