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

    window.onload = function () {
        campaignId = util.getQueryStringParam('campaignId');

        encounter.party = repo.fetch(campaignId.replace('campaign', 'characters'));

        document.getElementById('form-add-encounter').onsubmit = function () {
            generateCharacter();
            window.history.back();
            return false;
        };

        var newListItem = document.createElement('li');
        newListItem.innerHTML = document.getElementById('tmpl-foe').innerHTML;
        var crSelect = Array.prototype.filter.call(
            newListItem.children,
            function (elem) { return elem.getAttribute('name') === 'foe-challenge-rating'; }
        )[0];
        crSelect.value = encounter.foes[0].challengeRating;

        tmpl.build({
            input: document.getElementById('tmpl-character').innerHTML,
            objects: encounter.party,
            element: document.getElementById('list-characters')
        })

        document.getElementById('list-foes').appendChild(newListItem);
    };
})();