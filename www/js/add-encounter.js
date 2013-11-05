(function() {
    var campaignId;
    var encounter = {
        foes: [{challengeRating:1, quantity:1}]
    };
    var loadedEncounter;

    var saveEncounter = function (rewards) {
        var id = campaignId.replace('campaign', 'encounters');
        var encounterId = loadedEncounter ? loadedEncounter.id : util.makeId('encounter');
        repo.storeItemToList({
            listId: id,
            item: {
                id: encounterId,
                foes: encounter.foes,
                rewards: rewards,
                date: new Date()
            }
        });
    };

    var applyScores = function (party) {
        var result = calculator.partyXP(encounter);
        if (loadedEncounter) {
            calculator.rollBackResult(loadedEncounter.rewards, party);
        }
        calculator.applyResultToParty(result, party);
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

            var crOverButton = util.findInput(newListItem, 'over');
            if (!foe.crTooHigh)
                crOverButton.classList.add('hidden');
            crOverButton.onclick = function () {
                alert(
                    'This challenge rating is too high for some of your party. No XP will be rewarded.\n\n'+
                    'Remember, you can adjust the XP of players by hand from their individual pages if you need to');
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
        buildFoeListing();
    };

    var getPartyId = function () {
        return campaignId.replace('campaign', 'characters');
    };

    var pullPartyFromDatabase = function () {
        return repo.fetch(getPartyId());
    };

    var loadEncounter = function (id) {
        var encounters = repo.fetch(campaignId.replace('campaign', 'encounters'));
        return encounters.filter(function (encounter) {
            return encounter.id === id;
        })[0];
    };

    var trashEncounter = function() {
        var id = campaignId.replace('campaign', 'encounters');
        repo.eraseItemFromList({listId:id, itemId:loadedEncounter.id});
    };

    var confirmTrashEncounter = function () {
        if (window.confirm('Delete this encounter?'))
        {
            trashEncounter();
            window.history.back();
        }
        return false;
    };

    window.onload = function () {
        campaignId = util.getQueryStringParam('campaignId');
        encounter.party = pullPartyFromDatabase();

        var encounterId = util.getQueryStringParam('id');
        if (encounterId) {
            loadedEncounter = loadEncounter(encounterId);
            var clonedEncounter = JSON.parse(JSON.stringify(loadedEncounter));
            encounter.foes = clonedEncounter.foes;
            document.getElementById('page-title').innerText = 'Edit encounter';
            document.getElementById('btn-trash-encounter').onclick = confirmTrashEncounter;
        } else {
            document.getElementById('btn-trash-encounter').classList.add('hidden');
        }

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

        var nav = document.getElementById('nav');
        var fixPagesHeight = function() {
            var newHeight = (window.innerHeight - nav.offsetHeight - 20) + 'px';
            document.getElementById('content').style.height = newHeight;
        };
        window.onresize = fixPagesHeight;
        fixPagesHeight();
    };
})();