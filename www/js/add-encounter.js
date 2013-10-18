(function() {
    var campaignId;
    var encounter = {
        foes: [{challengeRating:1, quantity:1}]
    };

    var saveEncounter = function (rewards) {
         var id = campaignId.replace('campaign', 'encounters');
        repo.storeItemToList({
            listId: id,
            item: {
                id: util.makeId('encounter'),
                foes: encounter.foes,
                rewards: rewards,
                date: new Date()
            }
        });
    };

    var applyScores = function (party) {
        var result = calculator.partyXP(encounter);
        party.forEach(function (player){
            player.xp += result[player.id] || 0;
        });
        saveEncounter(result);
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
                recalculateScores();
            };
            
            var qInput = util.findInput(newListItem, 'foe-quantity');
            qInput.value = foe.quantity;
            qInput.onchange = function () {
                foe.quantity = qInput.value;
                recalculateScores();
            };

            var deleteButton = util.findInput(newListItem, 'delete');
            deleteButton.onclick = function () {
                encounter.foes.splice(index, 1);
                buildFoeListing();
                recalculateScores();
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
                    recalculateScores();
                };
            });
    };

    var recalculateScores = function () {
        var result = calculator.partyXP(encounter);
        encounter.party.forEach(function (player){
            player.xpGain = result[player.id] || '';
        });
        buildCharacterListing();
    };

    var getPartyId = function () {
        return campaignId.replace('campaign', 'characters');
    };

    var pullPartyFromDatabase = function () {
        return repo.fetch(getPartyId());
    };

    window.onload = function () {
        campaignId = util.getQueryStringParam('campaignId');
        encounter.party = pullPartyFromDatabase();

        buildFoeListing();
        recalculateScores();

        document.getElementById('btn-done').onclick = function () {
            var party = pullPartyFromDatabase();
            applyScores(party);
            repo.store(getPartyId(), party);
            window.history.back();
            return false;
        };

        document.getElementById('btn-add-foe').onclick = function () {
            encounter.foes.push({challengeRating:1, quantity:1});
            buildFoeListing();
            recalculateScores();
            return false;
        };
    };
})();