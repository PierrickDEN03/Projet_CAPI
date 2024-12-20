import { Game, User, Backlog } from '../game_class.js';
import { getItem, setItem, deleteItem } from '../local-storage_class.js';

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock;

// Mock pour self.crypto
global.self = {
    crypto: {
        randomUUID: jest.fn().mockReturnValue('mocked-uuid')
    }
};

describe("Tests unitaires classes", function () {

    //Tests d'importation des classes
    it("should import Game class", function () {
        expect(Game).toBeDefined();
    });

    it("should import User class", function () {
        expect(User).toBeDefined();
    });

    it("should import Backlog class", function () {
        expect(Backlog).toBeDefined();
    });

    //Définition d'objets de tests
    const backlog1 = new Backlog("backlog1", "description backlog 1", [], -2, 'backlog1-id', true);
    const backlog2 = new Backlog("backlog2", "description backlog 2", [], -2, 'backlog2-id', true);
    const user1 = new User("user1", 'user1-id');
    const user2 = new User("user2", 'user2-id');
    const game = new Game("game1", "moyenne", [user1, user2], [backlog1, backlog2], 'game1-id');

    it("should return name of game", function () {
        expect(game.name).toBe("game1");
    });

    it("should return name of users", function () {
        expect(game.userNames).toEqual([user1.name, user2.name]);
    });

    it("should return backlogs", function () {
        expect(game.backlogs).toEqual([backlog1, backlog2]);
    });

    it("should initialize game from JSON", function () {
        const json = {
            newGame: {
                name: 'Test Game',
                mode: 'moyenne',
                users: ['Alice', 'Bob'],
                backlogs: [
                    { title: 'Backlog 1', description: 'Description 1' },
                    { title: 'Backlog 2', description: 'Description 2', finalRate: 5 }
                ]
            }
        };

        const gameFromJson = Game.initFromJson(json);

        expect(gameFromJson.name).toBe('Test Game');
        expect(gameFromJson.mode).toBe('moyenne');
        expect(gameFromJson.users.length).toBe(2);
        expect(gameFromJson.users[0].name).toBe('Alice');
        expect(gameFromJson.users[1].name).toBe('Bob');
        expect(gameFromJson.backlogs.length).toBe(2);
        expect(gameFromJson.backlogs[0].title).toBe('Backlog 1');
        expect(gameFromJson.backlogs[0].description).toBe('Description 1');
        expect(gameFromJson.backlogs[0].finalRate).toBe(-2);
        expect(gameFromJson.backlogs[1].title).toBe('Backlog 2');
        expect(gameFromJson.backlogs[1].description).toBe('Description 2');
        expect(gameFromJson.backlogs[1].finalRate).toBe(5);
    });

    it("should restart game from JSON", function () {
        const json = {
            game: {
                name: 'Test Game',
                mode: 'moyenne',
                users: [{ name: 'Alice', id: 'user1-id' }, { name: 'Bob', id: 'user2-id' }],
                backlogs: [
                    { title: 'Backlog 1', description: 'Description 1', rates: [], finalRate: 3, id: 'backlog1-id', isFirstTurn: true },
                    { title: 'Backlog 2', description: 'Description 2', rates: [], finalRate: 5, id: 'backlog2-id', isFirstTurn: false }
                ]
            }
        };

        const gameFromJson = Game.restartFromJson(json);

        expect(gameFromJson.name).toBe('Test Game');
        expect(gameFromJson.mode).toBe('moyenne');
        expect(gameFromJson.users.length).toBe(2);
        expect(gameFromJson.users[0].name).toBe('Alice');
        expect(gameFromJson.users[0].id).toBe('user1-id');
        expect(gameFromJson.users[1].name).toBe('Bob');
        expect(gameFromJson.users[1].id).toBe('user2-id');
        expect(gameFromJson.backlogs.length).toBe(2);
        expect(gameFromJson.backlogs[0].title).toBe('Backlog 1');
        expect(gameFromJson.backlogs[0].description).toBe('Description 1');
        expect(gameFromJson.backlogs[0].finalRate).toBe(3);
        expect(gameFromJson.backlogs[0].id).toBe('backlog1-id');
        expect(gameFromJson.backlogs[0].isFirstTurn).toBe(true);
        expect(gameFromJson.backlogs[1].title).toBe('Backlog 2');
        expect(gameFromJson.backlogs[1].description).toBe('Description 2');
        expect(gameFromJson.backlogs[1].finalRate).toBe(5);
        expect(gameFromJson.backlogs[1].id).toBe('backlog2-id');
        expect(gameFromJson.backlogs[1].isFirstTurn).toBe(false);
    });

    it("should export game to JSON", function () {
        const jsonExport = game.jsonExport();
        const expectedJson = JSON.stringify({
            game: {
                name: 'game1',
                mode: 'moyenne',
                users: [
                    { name: 'user1', id: 'user1-id' },
                    { name: 'user2', id: 'user2-id' }
                ],
                backlogs: [
                    { id: 'backlog1-id', title: 'backlog1', description: 'description backlog 1', rates: [], finalRate: -2, isFirstTurn: true },
                    { id: 'backlog2-id', title: 'backlog2', description: 'description backlog 2', rates: [], finalRate: -2, isFirstTurn: true }
                ]
            }
        });

        expect(jsonExport).toBe(expectedJson);
    });

    it("should check if initialization step by step is over", function () {
        expect(game.isInitStepByStepOver()).toBe(true);
    });

    it("should get current mode of backlog", function () {
        expect(game.getCurrentMode(backlog1)).toBe("unanimite");
        backlog1.passedFirstTurn();
        expect(game.getCurrentMode(backlog1)).toBe("moyenne");
    });

    it("should set final rate of backlog based on game mode", function () {
        backlog1.rates = [{ value: 3, user: 'user1-id' }, { value: 5, user: 'user2-id' }];
        game.setFinalRate(backlog1);
        expect(backlog1.finalRate).toBe(4); // moyenne

        game.mode = 'mediane';
        backlog1.isFirstTurn = false;
        game.setFinalRate(backlog1);
        expect(backlog1.finalRate).toBe(4); // mediane

        game.mode = 'unanimite';
        backlog1.rates = [{ value: 5, user: 'user1-id' }, { value: 5, user: 'user2-id' }];
        game.setFinalRate(backlog1);
        expect(backlog1.finalRate).toBe(5); // unanimite

        backlog1.isFirstTurn = true;
        game.setFinalRate(backlog1);
        expect(backlog1.finalRate).toBe(5); // unanimite
        expect(backlog1.isFirstTurn).toBe(false); // passed first turn
    });

    it("should calculate average rate", function () {
        backlog1.rates = [{ value: 3, user: 'user1-id' }, { value: 5, user: 'user2-id' }];
        game.averageRate(backlog1);
        expect(backlog1.finalRate).toBe(4);
    });

    it("should calculate median rate", function () {
        backlog1.rates = [{ value: 3, user: 'user1-id' }, { value: 5, user: 'user2-id' }];
        game.medianRate(backlog1);
        expect(backlog1.finalRate).toBe(4);
    });

    it("should calculate unanimity rate", function () {
        backlog1.rates = [{ value: 5, user: 'user1-id' }, { value: 5, user: 'user2-id' }];
        game.unanimtyRate(backlog1);
        expect(backlog1.finalRate).toBe(5);
    });

    it("should initialize rates from users", function () {
        const rates = Backlog.initRatesFromUsers([user1, user2]);
        expect(rates).toEqual([{ value: -1, user: 'user1-id' }, { value: -1, user: 'user2-id' }]);
    });
});