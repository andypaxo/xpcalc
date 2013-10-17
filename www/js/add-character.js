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
            levelAdjustment : document.getElementById('input-level-adjust').value,
            xp : document.getElementById('input-xp').value,
            id : util.makeId('char')
        };
    };

    var fixUp = function (character) {
        if (character.name.length == 0)
            character.name = randomName;
        character.levelAdjustment = util.makeAtLeast(character.levelAdjustment, -20);
        character.xp = util.makeAtLeast(character.xp, 0);
        return character;
    };

    var save = function (character) {
        var id = campaignId.replace('campaign', 'characters');
        repo.storeItemToList({listId:id, item:character})
    }

    var generateCharacter = function () {
        return fixUp(getCharacter());
    };

    var saveCharacter = function () {
        save(generateCharacter());
    };

    var recalculateLevel = function () {
        var level = calculator.playerLevel(generateCharacter());
        document.getElementById('display-level').innerText = level.toString();
    }

    window.onload = function () {
        campaignId = util.getQueryStringParam('campaignId');
        document.getElementById('input-name').value = randomName;
        document.getElementById('input-name').select();

        document.getElementById('form-add-character').onsubmit = function () {
            saveCharacter();
            window.history.back();
            return false;
        };

        var ctx = this;
        var inputLevelAdjust = document.getElementById('input-level-adjust');
        var inputXp = document.getElementById('input-xp');
        var recalc = function() { recalculateLevel.call(ctx); }
        inputLevelAdjust.oninput = inputXp.oninput = recalc;
        recalculateLevel();
    };
})();