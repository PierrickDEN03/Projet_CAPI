import { deleteItem, getItem, setItem } from "./local-storage_class"

export class Game {
    #id
    #name
    #mode
    #users
    #backlogs

    /**
     * 
     * @param {number} id Id de la game
     * @param {string} name Nom de la game en cours
     * @param {'moyenne'|'mediane'|'unanimite'} mode Défini le mode du vote
     * @param {User[]} [users] Liste d'objet User
     * @param {Backlog[]} [backlogs] Liste d'objet Backlog
     */
    constructor(id,name,mode,users,backlogs){
        if(id === undefined || name === undefined || mode === undefined ){
            throw new Error("L'id et le name sont obligatoires pour définir un Game")
        }else{
            this.#id = id
            this.#name = name
            this.#mode = mode
            // Ces paramètres seront undefined lors de l'instanciation de la classe, puis rempli via les formulaires
            this.#users = users
            this.#backlogs = backlogs
        }
    }

    get id(){
        return this.#id
    }
    set id(id){
        this.#id = id
    }
    get name(){
        return this.#name
    }
    set name(name){
        this.#name = name 
    }
    get mode(){
        return this.#mode
    }
    set mode(mode){
        this.#mode = mode 
    }

    /**
     * Retourne le nom de tous les users
     * @returns {string[]} L'ensemble des noms des user
     */
    get users(){
        names = []
        for(let user of users){
            names.append(user.name)
        }
        
        return names
    }
    set users(names){
        for(let i = 0; i < names.length ; i++){
            this.#users.append(new User(i, names[i]))
        }
    }
    get backlogs(){
        return this.#backlogs
    }
    set backlogs(backlogs){
        this.#backlogs = backlogs
    }
}



class User {
    #id
    #name
    constructor(id,name){
        this.#id=id
        this.#name=name
    }

    get id(){
        return this.#id
    }
    set id(id){
        this.#id = id 
    }
    get name(){
        return this.#name
    }
    set name(name){
        this.#name = name 
    }
}


class Backlog {
    #id
    #title
    #description
    #rate

    constructor(id,title,description,rate){
        this.#id=id
        this.#title=title
        this.#description=description
        this.#rate = rate
    }

    get id(){
        return this.#id
    }
    set id(id){
        this.#id = id 
    }
    get title(){
        return this.#title
    }
    set title(title){
        this.#title = title 
    }
    get description(){
        return this.#description
    }
    set description(description){
        this.#description = description 
    }
    get rate(){
        return this.#rate
    }
    set rate(rate){
        this.#rate = rate 
    }
}