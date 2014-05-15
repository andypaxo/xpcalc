describe('Templator', function () {
    it('Should replace a string', function () {
        var result = tmpl.replaceStrings({
            input: '<b>@name</b>',
            obj: {
                id: '1d5b-86eD',
                name: 'Geoff'
            }
        });
        expect(result).toBe('<b>Geoff</b>');
    });

    it('Should replace several strings', function () {
        var result = tmpl.replaceStrings({
            input: '@id : <b>@name</b>',
            obj: {
                id: '1d5b-86eD',
                name: 'Geoff'
            }
        });
        expect(result).toBe('1d5b-86eD : <b>Geoff</b>');
    });

    it('Should replace overlapping identifiers', function () {
        var result = tmpl.replaceStrings({
            input: '@identifier : @name',
            obj: {
                identifier: '1d5b',
                name: 'Geoff'
            }
        });
        expect(result).toBe('1d5b : Geoff');
    });

    it('Add elements based on a collection', function () {
        var elem = document.createElement('ul');
        var result = tmpl.build({
            input: '<li>@id : <b>@name</b></li>',
            objects: [
                { id: '1d5b-86eD', name: 'Geoff' },
                { id: '9eC4-1GEo', name: 'Marion' }
            ],
            element: elem
        });

        var elem1 = elem.children[0];
        var elem2 = elem.children[1];
        expect(elem1.nodeName).toBe('LI');
        expect(elem1.innerHTML).toBe('1d5b-86eD : <b>Geoff</b>');
        expect(elem2.innerHTML).toBe('9eC4-1GEo : <b>Marion</b>');
    });
});