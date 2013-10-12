describe('Calculator', function () {
    it('Should calculate simple XP for 1 char', function () {
        var result = calculator.xp({
            playerLevel: 6,
            challenge: 4
        });
        expect(result).toBe(1200);
    });

    // Party
    // ECL
    // < level 3
    // > level 20
    // Special cases noted in calculator
    // Example from DM's guide
});