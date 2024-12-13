import { getItem, setItem } from "./local-storage_class"
import uuid from 'uuid'

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
    constructor(id, name, mode, users, backlogs) {
        if (name === undefined || mode === undefined) {
            throw new Error("Le name sont obligatoires pour définir un Game")
        } if (id !== undefined) {
            this.#name = getItem("name")
            this.#mode = getItem("mode")
            // Ces paramètres seront undefined lors de l'instanciation de la classe, puis rempli via les formulaires
            this.#users = getItem("users")
            this.#backlogs = getItem("backlogs")
        } else {
            this.#id = this.initId()
            this.name = name
            this.mode = mode
            // Ces paramètres seront undefined lors de l'instanciation de la classe, puis rempli via les formulaires
            this.#users = users
            this.#backlogs = backlogs
        }
    }

    /**
     * Crée l'id de la classe
     * @return {number}
     */
    initId() {
        return 28302903
    }

    /**
    * Retourne l'id de la game
    * @returns {number}
    */
    get id() {
        return this.#id
    }
    /**
     * Instancie l'id de la game
     * @param {number} id Id de la game
     */
    set id(id) {
        this.#id = id
    }
    /**
     * Renvoie le nom de la game
     * @returns {string}
     */
    get name() {
        return this.#name
    }
    /**
     * Instancie le nom de la game
     * @param {string} name Nom de la game
     */
    set name(name) {
        this.#name = name
        setItem(`gameName${this.#id}`, this.#name)
    }
    /**
     * Renvoie le mode de jeu de la game
     * @returns {string}
     */
    get mode() {
        return this.#mode
    }
    /**
     * Instancie le mode de jeu de la game
     * @param {string} mode Mode de jeu de la game
     */
    set mode(mode) {
        this.#mode = mode
        setItem(`gameMode${this.#id}`, this.#mode)
    }

    /**
     * Retourne le nom de tous les users
     * @returns {string[]} L'ensemble des noms des user
     */
    get users() {
        let names = []
        for (let user of this.#users) {
            names.push(user.name)
        }
        return names
    }
    /**
     * Instancie les users de la game
     * @param {string[]} names Liste des noms des users
     */
    set users(names) {
        let ids = []
        for (let i = 0; i < names.length; i++) {
            this.#users.push(new User(i, names[i]))
            ids.push(i)
        }
        setItem(`gameUsers${this.#id}`, ids)
    }
    /**
     * Retourne la liste des backlogs
     * @returns {string[]} L'ensemble des backlogs
     */
    get backlogs() {
        return this.#backlogs
    }
    /**
     * Instancie les backlogs de la game
     * @param {string[]} backlogs Liste des noms des backlogs
     */
    set backlogs(backlogs) {
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
    constructor(name) {
        if (name === undefined) {
            throw new Error("Le name est obligatoire pour définir un User")
        } else if (id !== undefined) {
            this.name = getItem(`userName${id}`)
        } else {
            this.id = uuid.v4()
            this.name = name
        }
    }

    /**
     * Retourne l'id du joueur
     * @returns {number}
     */
    get id() {
        return this.#id
    }
    /**
     * Instancie l'id du joueur
     * @param {number} id Id du joueur
     */
    set id(id) {
        this.#id = id
        setItem(`${this.#id}`, this.#id)
    }
    /**
     * Retourne le nom du joueur
     * @returns {string}
     */
    get name() {
        return this.#name
    }
    /**
     * Instancie le nom du joueur
     * @param {string} name Nom du joueur
     */
    set name(name) {
        this.#name = name
        setItem(`userName${this.#id}`, this.#name)
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
    constructor(id, title, description, rate) {
        if (title === undefined) {
            throw new Error("Le title est obligatoire pour définir un Backlog")
        } else if (id !== undefined) {
            this.title = getItem(`backlogTitle${id}`)
            this.description = getItem(`backlogDescription${id}`)
            this.rate = getItem(`backlogRate${id}`)
        } else {
            this.id = uuid.v4()
            this.title = title
            this.description = description
            //Rate sera undefined lors de l'instanciation de la classe, puis rempli via le jeu
            this.rate = rate
        }
    }

    /**
     * Retourne l'id de la fonctionnalité
     */
    get id() {
        return this.#id
    }
    /**
     * Instancie l'id de la fonctionnalité
     * @param {number} id Id de la fonctionnalité
     */
    set id(id) {
        this.#id = id
        setItem(`${this.#id}`, this.#id)
    }
    /** 
     * Retourne le titre de la fonctionnalité
    */
    get title() {
        return this.#title
    }
    /**
     * Instancie le titre de la fonctionnalité
     * @param {string} title Titre de la fonctionnalité
     */
    set title(title) {
        this.#title = title
        setItem(`backlogTitle${this.#id}`, this.#title)
    }
    /**
     * Retourne la description de la fonctionnalité
     */
    get description() {
        return this.#description
    }
    /**
     * Instancie la description de la fonctionnalité
     * @param {string} description Description de la fonctionnalité
     */
    set description(description) {
        this.#description = description
        setItem(`backlogDescription${this.#id}`, this.#description)
    }
    /**
     * Retourne la note de la fonctionnalité
     */
    get rate() {
        return this.#rate
    }
    /**
     * Instancie la note de la fonctionnalité
     * @param {number} rate Note de la fonctionnalité
     */
    set rate(rate) {
        this.#rate = rate
        setItem(`backlogRate${this.#id}`, this.#rate)
    }
}