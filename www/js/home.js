(function() {
    var generateCampaignName = function () {
        var places = ['Tower', 'Caves'];
        var descriptors = ['Doom', 'the Ancients'];

        return 'The ' + util.randomItemFrom(places) + ' of ' + util.randomItemFrom(descriptors);
    };

    window.onload = function () {
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
            input: '<li data-id="@id"><span class="item-description">@name</span></li>'
        });

        Array.prototype.forEach.call(listingElement.children, function (elem) {
            elem.onclick = function () {
                var campaignId = elem.attributes.getNamedItem('data-id').value;
            document.location = 'campaign.html?id=' + campaignId;
            };
        });
    };
})();