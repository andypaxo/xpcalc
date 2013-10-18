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

        Array.prototype.forEach.call(listingElement.children, function (elem) {
            elem.onclick = function () {
                var characterId = elem.attributes.getNamedItem('data-id').value;
                document.location = 'add-character.html?campaignId=' + campaignId + '&characterId=' + characterId;
            };
        });

        document.getElementById('btn-add-char').onclick = function () {
            document.location = 'add-character.html?campaignId=' + campaignId;
        };

        document.getElementById('btn-add-encounter').onclick = function () {
            document.location = 'add-encounter.html?campaignId=' + campaignId;
        };

        document.getElementById('btn-edit-campaign').onclick = function () {
            document.location = 'start-campaign.html?campaignId=' + campaignId;
        };

        document.getElementById('btn-edit-encounters').onclick = function () {
            document.location = 'list-encounters.html?campaignId=' + campaignId;
        };
    };
})();