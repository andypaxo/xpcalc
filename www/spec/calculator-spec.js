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

    describe('Foe with CR too high for player', function () {
        it('Should not add points and warn the user', function () {
            var input = {
                party : [
                    {id: 'bF90dd', playerLevel: 4200}
                ],
                foes: [
                    { challengeRating: 2, quantity: 2 },
                    { challengeRating: 12, quantity: 1 }
                ]
            };
            var result = calculator.partyXP(input);

            expect(result['bF90dd']).toBe(1200);
            expect(input.foes[0].crTooHigh).toBe(false);
            expect(input.foes[1].crTooHigh).toBe(true);
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

    describe('Apply calculations to party', function () {
        describe('It should apply a result', function () {
            var resultToApply = {
                aaaa : 100,
                bbbb : 150,
                cccc : 200
            };
            var party = [
                { id : 'aaaa', xp : 2000 },
                { id : 'bbbb', xp : 2500 },
                { id : 'cccc', xp : 1000 }
            ];

            calculator.applyResultToParty(resultToApply, party);
            expect(party[0].xp).toBe(2100);
            expect(party[1].xp).toBe(2650);
            expect(party[2].xp).toBe(1200);
        });

        describe('It should roll back a result', function () {
            var resultToApply = {
                aaaa : 100,
                bbbb : 150,
                cccc : 200
            };
            var party = [
                { id : 'aaaa', xp : 2100 },
                { id : 'bbbb', xp : 2650 },
                { id : 'dddd', xp : 1200 }
            ];

            calculator.rollBackResult(resultToApply, party);
            expect(party[0].xp).toBe(2000);
            expect(party[1].xp).toBe(2500);
            expect(party[2].xp).toBe(1200); // Not in result, leave unchanged
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