import { getItem, setItem } from "./local-storage_class"
import uuid from 'uuid'

/**Classe à utiliser pour faire un game */
export class Game {
    #id = undefined
    #name = undefined
    #mode = "moyenne"
    #users = []
    #backlogs = []

    /**
     * Instancie un nouvel objet à partir de ses paramètres name, mode, users et back
     * @param {string} id Id de la game
     * @param {string} name Nom de la game en cours
     * @param {'moyenne'|'mediane'|'unanimite'} mode Défini le mode du vote, soit moyenne, mediane ou unanimite
     * @param {User[]} [users] Liste d'objet User
     * @param {Backlog[]} [backlogs] Liste d'objet Backlog
     * @param {string} [id] Donner l'id seulement si l'on définit une game déjà existante
     */
    constructor(name, mode, users, backlogs, id) {
        if (name !== undefined && mode !== undefined) {
            this.#id = id === undefined ? uuid.v4() : id
            this.name = name
            this.mode = mode
            // Ces paramètres seront undefined lors de l'instanciation de la classe, puis rempli via les formulaires
            this.users = users
            this.backlogs = backlogs
        } else {
            throw new Error("Le name et le mode sont obligatoires pour définir un Game")
        }
    }

    /**
     * Pour initialiser une game à partir de son id
     * @param {string} id Un identifiant unique pour la game
     * @returns {Game}
     */
    static initFromId(id) {
        let backlogsId = getItem(`gameBacklogs${id}`)
        let backlogs = []
        for (let backlogId of backlogsId) {
            backlogs.push(Backlog.initFromId(backlogId))
        }
        let usersId = getItem(`gameUsers${id}`)
        let users = []
        for (let userId of usersId) {
            users.push(User.initFromId(userId))
        }
        return new Game(id, getItem(`gameName${id}`), getItem(`gameMode${id}`), users, backlogs)
    }

    /**
    * Retourne l'id de la game
    * @returns {number}
    */
    get id() {
        return this.#id
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
    set users(users) {
        this.#users = users
        let ids = []
        for (let user of this.#users) {
            ids.push(user.id)
        }
        setItem(`gameUsers${this.#id}`, ids)
    }
    /**
     * Retourne la liste des backlogs
     * @returns {Backlog[]} L'ensemble des backlogs
     */
    get backlogs() {
        return this.#backlogs
    }
    /**
     * Instancie les backlogs de la game
     * @param {Backlog[]} backlogs Liste des noms des backlogs
     */
    set backlogs(backlogs) {

        this.#backlogs = backlogs
    }
}


/**Classe à utiliser pour créer un joueur */
export class User {
    #id = undefined
    #name = undefined
    /**
     * Défini avec le nom de l'utilisateur ou le ou avec l'id pour récupérer un utilisateur déjà existant
     * @param {string} id Id du joueur
     * @param {string} name Nom du joueur
     * @param {string} [id] Donner l'id seulement si l'on définit un utilisateur déjà existant
     */
    constructor(name, id) {
        if (name !== undefined) {
            this.id = id === undefined ? uuid.v4() : id
            this.name = name
        } else {
            throw new Error("Le name ou l'id est obligatoire pour définir un User")
        }
    }

    /**
     * Pour initialiser un joueur existant à partir de son id
     * @param {string} id 
     * @returns {User}
     */
    static initFromId(id) {
        return new User(id, getItem(`userName${id}`))
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
    #id = undefined
    #title = undefined
    #description = ""
    #rate = -1

    /**
     * Si l'id est défini avec undefined, alors on instancie un objet Backlog à partir des paramètres title, description et rate, sinon on instancie en récupérant les données enregistrer à partir de l'id
     * @param {string} id Id de la fonctionnalité
     * @param {string} title Titre de la fonctionnalité
     * @param {string} [description] Description (facultatif)
     * @param {number} [rate] Note attribuée à la fonctionnalité de 0 à 100, et -1 est l'état pour non noté (facultatif)
     * @param {string} [id] Donner l'id seulement si l'on définit une fonctionnalité déjà existante
     */
    constructor(title, description, rate, id) {
        if (title !== undefined) {
            this.id = id === undefined ? uuid.v4() : id
            this.title = title
            this.description = description
            //Rate sera undefined lors de l'instanciation de la classe, puis rempli via le jeu
            this.rate = rate
        } else {
            throw new Error("Le title ou l'id est obligatoire pour définir un Backlog")
        }
    }

    /**
     * Pour initialiser une fonctionnalité existante à partir de son id
     * @param {string} id 
     * @returns {Backlog}
     */
    static initFromId(id) {
        return new Backlog(id, getItem(`backlogTitle${id}`, getItem(`backlogDescription${id}`, getItem(`backlogRate${id}`))))
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
        setItem(`backlogId${this.#id}`, this.#id)
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
        if (rate < -1 || rate > 100) {
            throw new Error("La note doit être comprise entre 0 et 100")
        }
        this.#rate = rate
        setItem(`backlogRate${this.#id}`, this.#rate)
    }
}