describe('Calculator', function () {
    describe('Single challenge calculations', function () {
        it('Should calculate simple XP for one character / foe', function () {
            var result = calculator.singleXP({
                playerLevel: 6,
                challengeRating: 4
            });
            expect(result).toBe(900);
        });

        it('Should calculate simple XP for a character below level 3', function () {
            var result = calculator.singleXP({
                playerLevel: 2,
                challengeRating: 2
            });
            expect(result).toBe(600);
        });

        it('Should calculate simple XP for a challenge above rating 20', function () {
            var result = calculator.singleXP({
                playerLevel: 20,
                challengeRating: 23
            });
            expect(result).toBe(16000);
        });

        it('Should calculate simple XP for a fractional challenge rating', function () {
            var result = calculator.singleXP({
                playerLevel: 1,
                challengeRating: 0.5
            });
            expect(result).toBe(150);
        });
    });

    describe('Single player, multiple foes', function () {
        it('Should add together a couple of rewards', function () {
            var result = calculator.playerXP({
                playerLevel: 3,
                foes: [
                    { challengeRating: 2, quantity: 2 },
                    { challengeRating: 3, quantity: 1 }
                ]
            });
            expect(result).toBe(2100);
        });
    });

    describe('Whole party, whole encounter', function () {
        it('Should divide experience across party', function () {
            var result = calculator.partyXP({
                party : [
                    { id: 'LV6aeP', xp: 3200 },
                    { id: 'GoChCx', xp: 7250 },
                    { id: 'LVTDfc', xp: 7250 },
                    { id: 'Rjbp2u', xp: 12000 },
                ],
                foes: [
                    { challengeRating: 2, quantity: 2 },
                    { challengeRating: 3, quantity: 1 }
                ]
            });

            expect(result['LV6aeP']).toBe(525);
            expect(result['GoChCx']).toBe(500);
            expect(result['LVTDfc']).toBe(500);
            expect(result['Rjbp2u']).toBe(437);
        });

        it('Should exclude absent party members', function () {
            var result = calculator.partyXP({
                party : [
                    { id: 'LV6aeP', xp: 3200 },
                    { id: 'GoChCx', xp: 7250, include: true },
                    { id: 'LVTDfc', xp: 7250 },
                    { id: 'Rjbp2u', xp: 12000, include: false },
                ],
                foes: [
                    { challengeRating: 1, quantity: 2 },
                    { challengeRating: 3, quantity: 1 }
                ]
            });

            expect(result['LV6aeP']).toBe(500);
            expect(result['GoChCx']).toBe(466);
            expect(result['LVTDfc']).toBe(466);
            expect(result['Rjbp2u']).toBeUndefined();
        });
    });

    describe('Calculating levels', function() {
        it('Should calculate regular and epic levels', function () {
            expect(calculator.playerLevel({xp : 1})).toBe(1);
            expect(calculator.playerLevel({xp : 3000})).toBe(3);
            expect(calculator.playerLevel({xp : 407000})).toBe(29);
        });

        it ('Should take level adjustment into account', function () {
            expect(calculator.playerLevel({xp : 2500, levelAdjustment: 2})).toBe(4);
        });
    });

    // [x] Party
    // [x] ECL?
    // [x] Rounding
    // [x] < level 3
    // [x] > level 20
    // [x] Special cases noted in calculator
    // [x] Example from DM's guide
    // [x] Decide what to do with out of bounds challenges
});