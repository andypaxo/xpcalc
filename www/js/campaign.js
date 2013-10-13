(function() {
    window.onload = function () {
        var campaignId = util.getQueryStringParam('id');
        document.getElementById('title-campaign-name').innerText = campaignId;
    };
})();