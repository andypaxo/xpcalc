(function() {
    var countFoes = function(encounter) {
        var count = encounter.foes.reduce(function (curr, foe) {
            return curr + Number(foe.quantity);
        }, 0);
        return count + ' foe' + (count == 1 ? '' : 's');
    };

    var attachClickHandler = function(elem, campaignId, encounterId) {
        elem.onclick = function () {
            document.location = 'add-encounter.html?campaignId=' + campaignId + '&id=' + encounterId;
        };
    }

    window.onload = function () {
        var campaignId = util.getQueryStringParam('id');
        var campaign = repo.fetch(campaignId);
        document.getElementById('title-campaign-name').innerText = campaign.name;

        // Encounters ---------------------------------------------------

        var listingElement = document.getElementById('list-encounters');

        var encounters = repo.fetch(campaignId.replace('campaign', 'encounters')) || [];
        encounterListing = encounters.map(function (encounter) {
            return {
                id : encounter.id,
                when : humanized_time_span(new Date(encounter.date)),
                foeCount : countFoes(encounter)
            };
        });

        tmpl.build({
            element: listingElement,
            objects: encounterListing,
            input: '<li class="encounter-item" data-id="@id"><span class="item-description">@when</span><br/><span class="item-subtext">@foeCount</span></li>'
        });

        var elems = document.getElementsByClassName('encounter-item');
        for (var i = elems.length - 1; i >= 0; i--) {
            var encounterId = elems[i].getAttribute('data-id');
            attachClickHandler(elems[i], campaignId, encounterId);
        };

        // Characters ---------------------------------------------------

        var characters = repo.fetch(campaignId.replace('campaign', 'characters')) || [];
        characters.forEach(function (char) {
            char.level = calculator.playerLevel(char);
        });

        var listingElement = document.getElementById('list-characters');

        tmpl.build({
            element: listingElement,
            objects: characters,
            input: '<li data-id="@id"><span class="item-description">@name</span><br/><span class="item-subtext">Level @level, @xp XP</span></li>'
        });

        Array.prototype.forEach.call(listingElement.children, function (elem) {
            elem.onclick = function () {
                var characterId = elem.attributes.getNamedItem('data-id').value;
                document.location = 'add-character.html?campaignId=' + campaignId + '&characterId=' + characterId;
            };
        });

        document.getElementById('btn-add-char').onclick = function () {
            document.location = 'add-character.html?campaignId=' + campaignId;
        };

        document.getElementById('btn-add-encounter').onclick = function () {
            document.location = 'add-encounter.html?campaignId=' + campaignId;
        };

        document.getElementById('btn-edit-campaign').onclick = function () {
            document.location = 'start-campaign.html?campaignId=' + campaignId;
        };

        // Tabs ---------------------------------------------------------

        var tabs = Array.prototype.slice.call(document.getElementsByClassName('tab'));

        var initialSlide = repo.fetch('campaign-initial-tab') || 0;

        document.getElementsByClassName('tab')[initialSlide].classList.add('active');

        var swiper = new Swiper('.swiper-container', {
            mode: 'horizontal',
            initialSlide: initialSlide,
            onSlideChangeStart: function (swiper) {
                tabs.forEach(function (elem, index) {
                    if (swiper.activeIndex === index)
                        elem.classList.add('active');
                    else
                        elem.classList.remove('active');
                });

                repo.store('campaign-initial-tab', swiper.activeIndex);
            }
        });

        var nav = document.getElementById('nav');
        var fixPagesHeight = function() {
            var newHeight = (window.innerHeight - nav.offsetHeight - 20) + 'px';
            document.getElementById('content').style.height = newHeight;
            Array.prototype.forEach.call(
                document.getElementsByClassName('swiper-slide'),
                function (elem) {
                    elem.style.height = newHeight;
                });
        };
        window.onresize = fixPagesHeight;
        fixPagesHeight();

        tabs.forEach(function (elem, index) {
            elem.onclick = function () {
                swiper.swipeTo(index);
            };
        });

        // Undo ---------------------------------------------------------

        var undoState = repo.getUndoState();
        if (undoState) {
            var undoButton = document.getElementById('undo-message');
            var undoMessageElem = document.getElementsByClassName('undo-description')[0];
            undoButton.classList.remove('hidden');
            undoMessageElem.innerText = undoState.message;
            repo.clearUndoState();

            undoButton.onclick = function () {
                repo.restoreUndoState(undoState);
                window.location.reload();
            };
        }

        // Hints --------------------------------------------------------

        if (!characters.length) {
            document.getElementById('new-party-hint').style.display = 'block';
        } else if (characters.length > 2 && !encounters.length) {
            document.getElementById('new-encounter-hint').style.display = 'block';
        }
    };
})();