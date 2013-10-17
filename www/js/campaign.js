(function() {
    window.onload = function () {
        var campaignId = util.getQueryStringParam('id');
        var campaign = repo.fetch(campaignId);
        document.getElementById('title-campaign-name').innerText = campaign.name;

        var characters = repo.fetch(campaignId.replace('campaign', 'characters')) || [];
        characters.forEach(function (char) {
            char.level = calculator.playerLevel(char);
        });

        var listingElement = document.getElementById('list-characters');

        tmpl.build({
            element: listingElement,
            objects: characters,
            input: '<li data-id="@id"><span class="item-description">@name</span><br/><span class="item-subtext">Level @level, @xp XP</span></li>'
        });

        document.getElementById('btn-add-char').onclick = function () {
            document.location = 'add-character.html?campaignId=' + campaignId;
        };

        document.getElementById('btn-add-encounter').onclick = function () {
            document.location = 'add-encounter.html?campaignId=' + campaignId;
        };
    };
})();