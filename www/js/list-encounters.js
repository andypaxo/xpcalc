(function () {
    var countFoes = function(encounter) {
        var count = encounter.foes.reduce(function (curr, foe) {
            return curr + Number(foe.quantity);
        }, 0);
        return count + ' foe' + (count == 1 ? '' : 's');
    }

    window.onload = function () {
        var campaignId = util.getQueryStringParam('campaignId');
        var campaign = repo.fetch(campaignId);
        document.getElementById('title-campaign-name').innerText = campaign.name;

        var listingElement = document.getElementById('list-encounters');

        var encounters = repo.fetch(campaignId.replace('campaign', 'encounters')) || [];
        encounterListing = encounters.map(function (encounter) {
            return {
                when : humanized_time_span(new Date(encounter.date)),
                foeCount : countFoes(encounter)
            };
        });

        tmpl.build({
            element: listingElement,
            objects: encounterListing,
            input: '<li data-id="@id"><span class="item-description">@when</span><br/><span class="item-subtext">@foeCount</span></li>'
        });
    };
})();