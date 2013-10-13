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
    var campaigns = campaignListing.map(function (id) {
        return repo.fetch(id);
    });
    var listingElement = document.getElementById('list-campaigns');

    tmpl.build({
        element: listingElement,
        objects: campaigns,
        input: '<li><span class="item-description">@name</span></li>'
    })
})();