(function() {
    var names = [
        'Endel', 'Awor', 'Quebas', 'Ariss', 'Eldfing', 'Setanu', 'Onuz',
        'Sersam', 'Dynab', 'Quequeo', 'Awmen', 'Rileg', 'Drayss', 'Omdar',
        'Rotedyn', 'Serzol', 'Wale', 'Lertqua', 'Leild', 'Roddara', 'Rissha',
        'Nalkima', 'Aradi', 'Elyee', 'Sersulim', 'Raddarmos', 'Fenn', 'Lor',
        'Kimurne', 'Radranu', 'Nynage', 'Etqua', 'Undskel', 'Banyage', 'Vuron',
        'Krusk', 'Gimble', 'Devis', 'Jozan', 'Eberk', 'Vadania', 'Regdar',
        'Tordek', 'Ember', 'Alhandra', 'Soveliss', 'Lidda', 'Kerwyn', 'Hennet',
        'Aramil', 'Mialee', 'Ialdabode', 'Mitra', 'Sandharrow', 'Eulad', 'Xerxes'];
    var randomName = util.randomItemFrom(names);
    var campaignId;
    var characterId;

    var getCharacter = function (id) {
        return (id
            ?  repo.getCharacter(campaignId, id)
            :  fixUp({
                name : document.getElementById('input-name').value,
                levelAdjustment : document.getElementById('input-level-adjust').value,
                xp : document.getElementById('input-xp').value,
                id : util.makeId('char')
            })
        );
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

    var saveCharacter = function () {
        var character = getCharacter();
        if (characterId)
            character.id = characterId;
        save(character);
    };

    var recalculateLevel = function () {
        var level = calculator.playerLevel(getCharacter());
        document.getElementById('display-level').innerText = level.toString();
    };

    var trashCharacter = function() {
        var character = getCharacter(characterId);
        var id = campaignId.replace('campaign', 'characters');
        repo.setUndoState({objectId:id, message:'Deleted ' + character.name});
        repo.eraseItemFromList({listId:id, itemId:characterId});
    };

    var confirmTrashCharacter = function () {
        if (window.confirm('Delete this character?'))
        {
            trashCharacter();
            window.history.back();
        }
        return false;
    };

    window.onload = function () {
        campaignId = util.getQueryStringParam('campaignId');
        characterId = util.getQueryStringParam('characterId');
        var character = getCharacter(characterId);
        document.getElementById('input-name').value = characterId ? character.name : randomName;
        document.getElementById('input-level-adjust').value = characterId ? character.levelAdjustment : '';
        document.getElementById('input-xp').value = characterId ? character.xp : '';

        if (characterId) {
            document.getElementById('btn-add-char').innerText = 'Save';
            document.getElementById('title-text').innerText = 'Edit character';
            document.getElementById('btn-trash-character').onclick = confirmTrashCharacter;
        } else {
            document.getElementById('btn-trash-character').classList.add('hidden');
        }

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

        var nav = document.getElementById('nav');
        var fixPagesHeight = function() {
            var newHeight = (window.innerHeight - nav.offsetHeight - 20) + 'px';
            document.getElementById('content').style.height = newHeight;
        };
        window.onresize = fixPagesHeight;
        fixPagesHeight();
    };
})();