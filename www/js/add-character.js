(function() {
    var names = [ 'Endel', 'Awor', 'Quebas', 'Ariss', 'Eldfing', 'Saytanu', 'Onuz', 'Sersam', 'Dynab', 'Quequeo', 'Awmen', 'Rilaugha', 'Drayss', 'Omdar', 'Rodtdyn', 'Serzold', 'Wale', 'Lertqua', 'Leild', 'Roddara', 'Risshy' ];

    window.onload = function () {
        var name = util.randomItemFrom(names) + ' ' + util.randomItemFrom(names);
        document.getElementById('input-name').setAttribute('value', name);
        document.getElementById('input-name').select();

        document.getElementById('form-add-character').onsubmit = function () {
            
            return false;
        };
    };
})();