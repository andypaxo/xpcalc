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
            util.findInput(newListItem, 'foe-challenge-rating').value = foe.challengeRating;
            util.findInput(newListItem, 'foe-quantity').value = foe.quantity;
            document.getElementById('list-foes').appendChild(newListItem);
        });
    };

    var buildCharacterListing = function () {
        tmpl.build({
            input: document.getElementById('tmpl-character').innerHTML,
            objects: encounter.party,
            element: document.getElementById('list-characters')
        });
    };

    window.onload = function () {
        campaignId = util.getQueryStringParam('campaignId');
        encounter.party = repo.fetch(campaignId.replace('campaign', 'characters'));

        buildFoeListing();
        buildCharacterListing();

        document.getElementById('btn-done').onclick = function () {
            window.history.back();
            return false;
        };

        document.getElementById('btn-add-foe').onclick = function () {
            encounter.foes.push({challengeRating:1, quantity:1});
            buildFoeListing();
            return false;
        };
    };
})();