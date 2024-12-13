
import {Game,User,Backlog} from './game_class.js'

describe("Tests unitaires classes", function(){
    it("should return a", function(){
        expect(true).toBe(true)
    })
     
    //Tests d'importation des classes
    it("should import Game class", function() {
        expect(Game).toBeDefined();
    });

    it("should import User class", function() {
        expect(User).toBeDefined();
    });

    it("should import Backlog class", function() {
        expect(Backlog).toBeDefined();
    });
    
    //Définition d'objets de tests
    const backlog1 = new Backlog(1,"backlog1","",12)
    const backlog2 = new Backlog(2,"backlog2","description backlog 2",25)
    const user1 = new User(1,"user1")
    const user2 = new User(2,"user2")
    const game = new Game(1,"game1","moyenne",[user1,user2],[backlog1,backlog2])
    it("should return name of game", function(){
        expect(game.name).toBe("game1")
    })
    it("should return name of users", function(){
        expect(game.users).toEqual([user1.name,user2.name])
    })
    it("should return name of backlogs", function(){
        expect(game.backlogs).toEqual([backlog1,backlog2])
    })
    
})


