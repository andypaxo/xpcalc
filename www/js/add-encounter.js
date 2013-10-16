(function() {
    var campaignId;
    var encounter = {
        foes: [{challengeRating:1, quantity:1}]
    };

    var save = function (enounter) {
        var id = campaignId.replace('campaign', 'enounters');
        repo.storeItemToList({listId:id, item:encounter})
    }

    var generateCharacter = function () {
        var character = getCharacter();
        fixUp(character);
        save(character);
    };

    var buildFoeListing = function () {
        document.getElementById('list-foes').innerHTML = '';
        encounter.foes.forEach(function (foe, index) {
            var newListItem = document.createElement('li');
            newListItem.innerHTML = document.getElementById('tmpl-foe').innerHTML;
            
            var crInput = util.findInput(newListItem, 'foe-challenge-rating');
            crInput.value = foe.challengeRating;
            crInput.onchange = function () {
                foe.challengeRating = crInput.value;
                calculateScores();
            };
            
            var qInput = util.findInput(newListItem, 'foe-quantity')
            qInput.value = foe.quantity;
            qInput.onchange = function () {
                foe.quantity = qInput.value;
                calculateScores();
            };

            document.getElementById('list-foes').appendChild(newListItem);
        });
    };

    var buildCharacterListing = function () {
        tmpl.build({
            input: document.getElementById('tmpl-character').innerHTML,
            objects: encounter.party,
            element: document.getElementById('list-characters')
        });
        Array.prototype.forEach.call(
            document.getElementsByClassName('character-enable'),
            function (elem) {
                elem.onclick = function () {
                    var charId = elem.getAttribute('name');
                    var character = encounter.party.filter(function (c) { return c.id === charId; })[0];
                    character.include = elem.checked;
                    calculateScores();
                };
            });
    };

    var calculateScores = function () {
        var result = calculator.partyXP(encounter);
        for(var playerId in result) {
            var player = encounter.party.filter(function (player) { return player.id === playerId; })[0];
            player.xpGain = result[playerId];
        };
        buildCharacterListing();
    };

    window.onload = function () {
        campaignId = util.getQueryStringParam('campaignId');
        encounter.party = repo.fetch(campaignId.replace('campaign', 'characters'));

        buildFoeListing();
        calculateScores();

        document.getElementById('btn-done').onclick = function () {
            window.history.back();
            return false;
        };

        document.getElementById('btn-add-foe').onclick = function () {
            encounter.foes.push({challengeRating:1, quantity:1});
            buildFoeListing();
            calculateScores();
            return false;
        };
    };
})();