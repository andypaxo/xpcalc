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
        var template = document.getElementById('tmpl-foe').innerHTML;
        document.getElementById('list-foes').innerHTML = '';

        encounter.foes.forEach(function (foe, index) {
            var newListItem = document.createElement('li');
            newListItem.innerHTML = template;
            
            var crInput = util.findInput(newListItem, 'foe-challenge-rating');
            crInput.value = foe.challengeRating;
            crInput.onchange = function () {
                foe.challengeRating = crInput.value;
                calculateScores();
            };
            
            var qInput = util.findInput(newListItem, 'foe-quantity');
            qInput.value = foe.quantity;
            qInput.onchange = function () {
                foe.quantity = qInput.value;
                calculateScores();
            };

            var deleteButton = util.findInput(newListItem, 'delete');
            deleteButton.onclick = function () {
                encounter.foes.splice(index, 1);
                buildFoeListing();
                calculateScores();
            };

            document.getElementById('list-foes').appendChild(newListItem);
        });
    };

    var buildCharacterListing = function () {
        var template = document.getElementById('tmpl-character').innerHTML;
        document.getElementById('list-characters').innerHTML = '';

        encounter.party.forEach(function (character) {
            var fragment = tmpl.replaceStrings({
                input: template,
                obj: character
            });
            fragment = fragment.replace('_checked', character.include !== false ? 'checked="checked"' : '');
            document.getElementById('list-characters').innerHTML += fragment;
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
        encounter.party.forEach(function (player){
            player.xpGain = result[player.id] || '';
        });
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