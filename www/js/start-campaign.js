(function() {
    var generateCampaignName = function () {
        var places = ['Tower', 'Caves'];
        var descriptors = ['Doom', 'the Ancients'];

        return 'The ' + util.randomItemFrom(places) + ' of ' + util.randomItemFrom(descriptors);
    };

    document.getElementById('form-start-campaign').onsubmit = function () {
        alert('go');
    };
})();