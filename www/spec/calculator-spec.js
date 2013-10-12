describe('Calculator', function () {
    describe('Single challenge calculations', function () {
        it('Should calculate simple XP for one character / challenge', function () {
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

    // Party
    // ECL?
    // Rounding
    // < level 3
    // > level 20
    // Special cases noted in calculator
    // Example from DM's guide
});