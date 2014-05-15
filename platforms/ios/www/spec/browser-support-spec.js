describe ('Expected JS APIs', function () {
    it('Should have array methods', function () {
        expect(typeof(Array.prototype.map)).toBe('function');
        expect(typeof(Array.prototype.reduce)).toBe('function');
        expect(typeof(Array.prototype.filter)).toBe('function');
    });

    it('Should have XMLHttpRequest level 2', function () {
        expect(typeof(FormData)).toBe('function');
    });
});