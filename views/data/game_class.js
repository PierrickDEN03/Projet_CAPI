import { deleteItem, getItem, setItem } from "./local-storage_class"

/**Classe à utiliser pour faire un game */
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

     /**
     * Retourne l'id de la game
     * @returns {number}
     */
    get id(){
        return this.#id
    }
    /**
     * Instancie l'id de la game
     * @param {number} id Id de la game
     */
    set id(id){
        this.#id = id
    }
    /**
     * Renvoie le nom de la game
     * @returns {string}
     */
    get name(){
        return this.#name
    }
    /**
     * Instancie le nom de la game
     * @param {string} name Nom de la game
     */
    set name(name){
        this.#name = name 
    }
    /**
     * Renvoie le mode de jeu de la game
     * @returns {string}
     */
    get mode(){
        return this.#mode
    }
    /**
     * Instancie le mode de jeu de la game
     * @param {string} mode Mode de jeu de la game
     */
    set mode(mode){
        this.#mode = mode 
    }

    /**
     * Retourne le nom de tous les users
     * @returns {string[]} L'ensemble des noms des user
     */
    get users(){
        let names = []
        for(let user of this.#users){
            names.push(user.name)
        }
        return names
    }
    /**
     * Instancie les users de la game
     * @param {string[]} names Liste des noms des users
     */  
    set users(names){
        for(let i = 0; i < names.length ; i++){
            this.#users.push(new User(i, names[i]))
        }
    }
    /**
     * Retourne la liste des backlogs
     * @returns {string[]} L'ensemble des backlogs
     */
    get backlogs(){
        return this.#backlogs
    }
    /**
     * Instancie les backlogs de la game
     * @param {string[]} backlogs Liste des noms des backlogs
     */
    set backlogs(backlogs){
        this.#backlogs = backlogs
    }
}


/**Classe à utiliser pour créer un joueur */
export class User {
    #id
    #name
    /**
     * 
     * @param {number} id Id du joueur
     * @param {string} name Nom du joueur
     */
    constructor(id,name){
        this.#id=id
        this.#name=name
    }

    /**
     * Retourne l'id du joueur
     * @returns {number}
     */
    get id(){
        return this.#id
    }
    /**
     * Instancie l'id du joueur
     * @param {number} id Id du joueur
     */
    set id(id){
        this.#id = id 
    }
    /**
     * Retourne le nom du joueur
     * @returns {string}
     */
    get name(){
        return this.#name
    }
    /**
     * Instancie le nom du joueur
     * @param {string} name Nom du joueur
     */
    set name(name){
        this.#name = name 
    }
}

/**Classe à utiliser pour créer une fonctionnalité */
export class Backlog {
    #id
    #title
    #description
    #rate

    /**
     * 
     * @param {number} id Id de la fonctionnalité
     * @param {string} title Titre de la fonctionnalité
     * @param {*} [description] Description (facultatif)
     * @param {*} [rate] Note attribuée à la fonctionnalité
     */
    constructor(id,title,description,rate){
        this.#id=id
        this.#title=title
        this.#description=description
        //Rate sera undefined lors de l'instanciation de la classe, puis rempli via le jeu
        this.#rate = rate
    }

    /**
     * Retourne l'id de la fonctionnalité
     */
    get id(){
        return this.#id
    }
    /**
     * Instancie l'id de la fonctionnalité
     * @param {number} id Id de la fonctionnalité
     */
    set id(id){
        this.#id = id 
    }
    /** 
     * Retourne le titre de la fonctionnalité
    */
    get title(){
        return this.#title
    }
    /**
     * Instancie le titre de la fonctionnalité
     * @param {string} title Titre de la fonctionnalité
     */
    set title(title){
        this.#title = title 
    }
    /**
     * Retourne la description de la fonctionnalité
     */
    get description(){
        return this.#description
    }
    /**
     * Instancie la description de la fonctionnalité
     * @param {string} description Description de la fonctionnalité
     */
    set description(description){
        this.#description = description 
    }
    /**
     * Retourne la note de la fonctionnalité
     */
    get rate(){
        return this.#rate
    }
    /**
     * Instancie la note de la fonctionnalité
     * @param {number} rate Note de la fonctionnalité
     */
    set rate(rate){
        this.#rate = rate 
    }
}