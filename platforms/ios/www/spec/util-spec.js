describe ('Util', function () {
    describe ('makeAtLeast', function () {
        it ('Should leave ok numbers alone', function () {
            expect(util.makeAtLeast('10', 1)).toBe(10);
            expect(util.makeAtLeast('0', 0)).toBe(0);
            expect(util.makeAtLeast(10538, 1000)).toBe(10538);
        });

        it ('Should handle sensible input', function () {
            expect(util.makeAtLeast('-900', 0)).toBe(0);
            expect(util.makeAtLeast('0', 1)).toBe(1);
            expect(util.makeAtLeast(1000, 10538)).toBe(10538);
        });
        
        it ('Should round values down', function () {
            expect(util.makeAtLeast('1.9', 0)).toBe(1);
            expect(util.makeAtLeast('1.3', 10)).toBe(10);
        });

        it ('Should return sensible value for wonky input', function () {
            expect(util.makeAtLeast('How much is the fish', 1)).toBe(1);
            expect(util.makeAtLeast(undefined, 1)).toBe(1);
            expect(util.makeAtLeast(NaN, 1)).toBe(1);
            expect(util.makeAtLeast('', 1)).toBe(1);
            expect(util.makeAtLeast('0x01', 10)).toBe(10);
            expect(util.makeAtLeast('0xff', 10)).toBe(255);
        }); 
    });

    describe('indexOfMatch', function() {
        it('Should return the index of the first matching item', function() {
            var result = util.indexOfMatch(
                ['Vermont', 'Cardiff', 'Amiens', 'Carlisle'],
                function (item) {
                    return item.indexOf('Car') == 0;
                }
            );
            expect(result).toBe(1);
        });

        it('Should return -1 if no match is found', function() {
            var result = util.indexOfMatch(
                ['Vermont', 'Montreal', 'Amiens', 'Poole'],
                function (item) {
                    return item.indexOf('Car') == 0;
                }
            );
            expect(result).toBe(-1);
        });
    });
});