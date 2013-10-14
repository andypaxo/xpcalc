(function() {
    var names = [
        'Endel', 'Awor', 'Quebas', 'Ariss', 'Eldfing', 'Setanu', 'Onuz',
        'Sersam', 'Dynab', 'Quequeo', 'Awmen', 'Rileg', 'Drayss', 'Omdar',
        'Rotedyn', 'Serzol', 'Wale', 'Lertqua', 'Leild', 'Roddara', 'Rissha',
        'Nalkima', 'Aradi', 'Elyee', 'Sersulim', 'Raddarmos', 'Fenn', 'Lor',
        'Kimurne', 'Radranu', 'Nynage', 'Etqua', 'Undskel', 'Banyage', 'Vuron'];
    var randomName = util.randomItemFrom(names) + ' ' + util.randomItemFrom(names);
    var campaignId;

    var getCharacter = function () {
        return {
            name : document.getElementById('input-name').value,
            level : document.getElementById('input-level').value,
            xp : document.getElementById('input-xp').value,
            id : util.makeId('char')
        };
    };

    var fixUp = function (character) {
        if (character.name.length == 0)
            character.name = randomName;
        character.level = util.makeAtLeast(character.level, 1);
        character.xp = util.makeAtLeast(character.xp, 0);
    };

    var save = function (character) {
        var id = campaignId.replace('campaign', 'characters');
        repo.storeItemToList({listId:id, item:character})
    }

    var generateCharacter = function () {
        var character = getCharacter();
        fixUp(character);
        save(character);
    };

    window.onload = function () {
        campaignId = util.getQueryStringParam('campaignId');
        document.getElementById('input-name').value = randomName;
        document.getElementById('input-name').select();

        document.getElementById('form-add-character').onsubmit = function () {
            generateCharacter();
            window.history.back();
            return false;
        };
    };
})();