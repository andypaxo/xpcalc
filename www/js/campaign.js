(function() {
    window.onload = function () {
        var campaignId = util.getQueryStringParam('id');
        var campaign = repo.fetch(campaignId);
        document.getElementById('title-campaign-name').innerText = campaign.name;

        var characters = repo.fetch(campaignId.replace('campaign', 'characters')) || [];

        var listingElement = document.getElementById('list-characters');

        tmpl.build({
            element: listingElement,
            objects: characters,
            input: '<li data-id="@id"><span class="item-description">@name</span></li>'
        });

        document.getElementById('btn-add-char').onclick = function () {
            document.location = 'add-character.html?campaignId=' + campaignId;
        };
    };
})();