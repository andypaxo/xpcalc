describe('Repository', function () {
    describe('When storing an item in a list', function () {

        it('Should prepend new items', function () {
            repo.store('repo-test-list', [{id:'abcd', name:'Cheltenham'}]);
            repo.storeItemToList({
                listId:'repo-test-list',
                item: {id: '1234', name: 'Manchester'}
            });
            var result = repo.fetch('repo-test-list');

            expect(result.length).toBe(2);
            expect(result[0].id).toBe('1234');
            expect(result[0].name).toBe('Manchester');
            expect(result[1].id).toBe('abcd');
            expect(result[1].name).toBe('Cheltenham');
        });

        it('Should modify existing items', function () {
            repo.store('repo-test-list', [{id:'abcd', name:'Cheltenham'}]);
            repo.storeItemToList({
                listId:'repo-test-list',
                item: {id: 'abcd', name: 'Manchester'}
            });
            var result = repo.fetch('repo-test-list');

            expect(result.length).toBe(1);
            expect(result[0].id).toBe('abcd');
            expect(result[0].name).toBe('Manchester');
        });

        it('Should create a new list if there wasn`t one there before', function () {
            repo.erase('repo-test-list');
            repo.storeItemToList({
                listId:'repo-test-list',
                item: {id: '1234', name: 'Manchester'}
            });
            var result = repo.fetch('repo-test-list');

            expect(result.length).toBe(1);
            expect(result[0].id).toBe('1234');
            expect(result[0].name).toBe('Manchester');
        });

    });

    describe('When erasing an item from a list', function () {

        it('Should remove the item', function () {
            repo.store('repo-test-list', [
                {id:'abcd', name:'Cheltenham'},
                {id: 'xyxy', name: 'Cardiff'},
                {id: '1234', name: 'Manchester'},
            ]);
            repo.eraseItemFromList({
                listId:'repo-test-list',
                itemId: 'xyxy'
            });
            var result = repo.fetch('repo-test-list');

            expect(result.length).toBe(2);
            expect(result[0].id).toBe('abcd');
            expect(result[0].name).toBe('Cheltenham');
            expect(result[1].id).toBe('1234');
            expect(result[1].name).toBe('Manchester');
        });
    });

    describe('When using undo', function () {

        it('Should set an undo state', function () {
            repo.store('campaign-1', {name:'To The Moon'});
            repo.setUndoState({
                objectId : 'campaign-1',
                message : 'Updated campaign'
            });
            var result = repo.getUndoState();

            expect(result.id).toBe('campaign-1');
            expect(result.data.name).toBe('To The Moon');
            expect(result.message).toBe('Updated campaign');
        });

        it('Should clear an undo state', function () {
            repo.store('campaign-1', {name:'To The Moon'});
            repo.setUndoState({
                objectId : 'campaign-1',
                message : 'Updated campaign'
            });
            repo.clearUndoState();
            var result = repo.getUndoState();

            expect(result).toBeNull();
        });

        it('Should restore an undo state', function () {
            repo.store('campaign-1', {name:'To The Moon'});
            repo.setUndoState({
                objectId : 'campaign-1',
                message : 'Updated campaign'
            });

            repo.store('campaign-1', {name:'Voyage to Manchester'});
            repo.restoreUndoState();

            var result = repo.fetch('campaign-1');
            var finalUndoState = repo.getUndoState();

            expect(result.name).toBe('To The Moon');
            expect(finalUndoState).toBeNull();
        });
    });
});