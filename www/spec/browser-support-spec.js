describe ('Expected JS APIs', function () {
    it('Should have array methods', function () {
        expect(typeof(Array.prototype.map)).toBe('function');
        expect(typeof(Array.prototype.reduce)).toBe('function');
        expect(typeof(Array.prototype.filter)).toBe('function');
    });
});