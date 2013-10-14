(function() {
    var names = [ 'Endel', 'Awor', 'Quebas', 'Ariss', 'Eldfing', 'Saytanu', 'Onuz', 'Sersam', 'Dynab', 'Quequeo', 'Awmen', 'Rilaugha', 'Drayss', 'Omdar', 'Rodtdyn', 'Serzold', 'Wale', 'Lertqua', 'Leild', 'Roddara', 'Risshy' ];
        var randomName = util.randomItemFrom(names) + ' ' + util.randomItemFrom(names);

    var getCharacter = function () {
        return {
            name : document.getElementById('input-name').getAttribute('value'),
            level : document.getElementById('input-level').getAttribute('value'),
            xp : document.getElementById('input-xp').getAttribute('value'),
            id : util.makeId('char');
        };
    };

    var fixUp = function (character) {
        if (character.name.length == 0)
            character.name = randomName;
        character.level = util.makeAtLeast(character.level, 1);
        character.xp = util.makeAtLeast(character.xp, 0);
    };

    var getCharacterList = function (character) {
        var id = util.getQueryStringParam(campaignId).replace('campaign', 'characters');
        repo.storeItemToList({listId:id, item:character})
    }

    var generateCharacter = function () {
        var character = getCharacter();
        fixUp(character);
        save(character);
    };

    window.onload = function () {
        document.getElementById('input-name').setAttribute('value', randomName);
        document.getElementById('input-name').select();

        document.getElementById('form-add-character').onsubmit = function () {
            generateCharacter();
            return false;
        };
    };
})();