
import { Game, User, Backlog } from '../game_class.js'
import { getItem, setItem, deleteItem } from '../local-storage_class.js'

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
jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));


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
    const backlog1 = new Backlog("backlog1", "", 12)
    const backlog2 = new Backlog("backlog2", "description backlog 2", 25)
    const user1 = new User("user1")
    const user2 = new User("user2")
    const game = new Game("game1", "moyenne", [user1, user2], [backlog1, backlog2])
    it("should return name of game", function () {
        expect(game.name).toBe("game1")
    })
    it("should return name of users", function () {
        expect(game.users).toEqual([user1.name, user2.name])
    })
    it("should return name of backlogs", function () {
        expect(game.backlogs).toEqual([backlog1, backlog2])
    })

})