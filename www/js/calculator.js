var calculator = new (function () {
    // Table from DM's guide p38
    var xpTable = [
        /*1st*/  [],
        /*2nd*/  [],        
        /*3rd*/  [300, 600, 900, 1350, 1800, 2700, 3600, 5400, 7200, 10800],
        /*4th*/  [300, 600, 800, 1200, 1600, 2400, 3200, 4800, 6400, 9600, 12800],
        /*5th*/  [300, 500, 750, 1000, 1500, 2250, 3000, 4500, 6000, 9000, 12000, 18000],
        /*6th*/  [300, 450, 600, 900, 1200, 1800, 2700, 3600, 5400, 7200, 10800, 14400, 21600],
        /*7th*/  [263, 350, 525, 700, 1050, 1400, 2100, 3150, 4200, 6300, 8400, 12600, 16800, 25200],
        /*8th*/  [200, 300, 400, 600, 800, 1200, 1600, 2400, 3600, 4800, 7200, 9600, 14400, 19200, 28800],
        /*9th*/  [0, 225, 338, 450, 675, 900, 1350, 1800, 2700, 4050, 5400, 8100, 10800, 16200, 21600, 32400],
        /*10th*/ [0, 0, 250, 375, 500, 750, 1000, 1500, 2000, 3000, 4500, 6000, 9000, 12000, 18000, 24000, 36000],
        /*11th*/ [0, 0, 0, 275, 413, 550, 825, 1100, 1650, 2200, 3300, 4950, 6600, 9900, 13200, 19800, 26400, 39600],
        /*12th*/ [0, 0, 0, 0, 300, 450, 600, 900, 1200, 1800, 2400, 3600, 5400, 7200, 10800, 14400, 21600, 28800, 43200],
        /*13th*/ [0, 0, 0, 0, 0, 325, 488, 650, 975, 1300, 1950, 2600, 3900, 5850, 7800, 11700, 15600, 23400, 31200, 46800],
        /*14th*/ [0, 0, 0, 0, 0, 0, 350, 525, 700, 1050, 1400, 2100, 2800, 4200, 6300, 8400, 12600, 16800, 25200, 33600],
        /*15th*/ [0, 0, 0, 0, 0, 0, 0, 375, 563, 750, 1125, 1500, 2250, 3000, 4500, 6750, 9000, 13500, 18000, 27000],
        /*16th*/ [0, 0, 0, 0, 0, 0, 0, 0, 400, 600, 800, 1200, 1600, 2400, 3200, 4800, 7200, 9600, 14400, 19200],
        /*17th*/ [0, 0, 0, 0, 0, 0, 0, 0, 0, 425, 638, 850, 1275, 1700, 2550, 3400, 5100, 7650, 10200, 15300],
        /*18th*/ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 450, 675, 900, 1350, 1800, 2700, 3600, 5400, 8100, 10800],
        /*19th*/ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 475, 713, 950, 1425, 1900, 2850, 3800, 5700, 8550],
        /*20th*/ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000]
    ];

    var levelList = [
        0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000,
        55000, 66000, 78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000,
        210000, 231000, 253000, 276000, 300000, 325000, 351000, 378000, 406000, 435000
    ];

    this.singleXP = function(challenge) {
        if (challenge.challengeRating - challenge.playerLevel >= 8)
            return undefined;

        if (challenge.challengeRating > 20)
            return 2 * this.singleXP({
                playerLevel: challenge.playerLevel,
                challengeRating: challenge.challengeRating - 2
            });

        // Minimum PL 3
        var playerLevel = Math.max(challenge.playerLevel, 3);
        var challengeRating = challenge.challengeRating;

        // Subtracting 1 for zero-based array index
        return challengeRating >= 1
            ? xpTable[playerLevel - 1][challengeRating - 1]
            : xpTable[playerLevel - 1][0] * challengeRating;
    };

    var addXP = function(playerLevel, calc) {
        return function(currXP, foe) {
            var xpPerFoe = calc.singleXP({
                playerLevel: playerLevel,
                challengeRating: foe.challengeRating
            });
            if (xpPerFoe === undefined) {
                foe.crTooHigh = true;
                return currXP;
            }

            return currXP + xpPerFoe * foe.quantity;
        };
    };

    this.playerXP = function(challenge) {
        var playerLevel = challenge.playerLevel;
        return challenge.foes.reduce(addXP(playerLevel, this), 0);
    };

    this.partyXP = function(encounter) {
        var result = {};
        var foes = encounter.foes;
        var party = encounter.party.filter(function (player) {
            return player.include !== false;
        });
        var numPlayers = party.length;

        foes.forEach(function (foe) {
            foe.crTooHigh = false;
        });
        party.forEach(function (player) {
            result[player.id] = Math.floor(this.playerXP({
                playerLevel: this.playerLevel(player),
                foes: foes
            }) / numPlayers);
        }, this);
        return result;
    };

    this.playerLevel = function(player) {
        var level;
        for (level = levelList.length - 1; level >= 0; level--) {
            if (levelList[level] <= player.xp)
                break;
        };

        return level + (player.levelAdjustment || 0) + 1;
    }
})();