import { getItem, setItem } from "./local-storage_class.js"

/**Classe à utiliser pour faire un game */
export class Game {
    #id = undefined
    #name = undefined
    #mode = "moyenne"
    #users = []
    #backlogs = []

    /**
     * Instancie un nouvel objet à partir de ses paramètres name, mode, users et back
     * @param {string} id Id de la game, généré automatiquement si non défini
     * @param {string} name Nom de la game en cours
     * @param {'moyenne'|'mediane'|'unanimite'} mode Défini le mode du vote, soit moyenne, mediane ou unanimite
     * @param {User[]} [users] Liste d'objet User
     * @param {Backlog[]} [backlogs] Liste d'objet Backlog
     * @param {string} [id] Donner l'id seulement si l'on définit une game déjà existante
     */
    constructor(name, mode, users, backlogs, id) {
        if (name !== undefined && mode !== undefined) {
            this.#id = id === undefined ? self.crypto.randomUUID() : id
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
     * Pour initialiser une game à partir de son id, en récupérant les données liées à cet id dans le local storage
     * @param {string} id Un identifiant unique pour la game
     * @returns {Game}
     */
    static initFromId(id) {
        let backlogsId = getItem(`gameBacklogs${id}`)
        let backlogs = undefined
        if (backlogsId != null) {
            backlogs = []
            for (let backlogId of backlogsId) {
                backlogs.push(Backlog.initFromId(backlogId))
            }
        }
        let usersId = getItem(`gameUsers${id}`)
        let users = undefined
        if (usersId != null) {
            users = []
            for (let userId of usersId) {
                users.push(User.initFromId(userId))
            }
        }
        return new Game(getItem(`gameName${id}`), getItem(`gameMode${id}`), users, backlogs, id)
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
        return this.#users
    }
    /**
     * Instancie les users de la game et garde en mémoire les ids de ces users
     * @param {User[]} users Liste des users
     */
    set users(users) {
        if (users != null) {
            this.#users = users
            let ids = []
            for (let user of this.#users) {
                ids.push(user.id)
            }
            setItem(`gameUsers${this.#id}`, ids)
        }
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
     * @param {Backlog[]} backlogs Liste des backlogs
     */
    set backlogs(backlogs) {
        if (backlogs != null) {
            this.#backlogs = backlogs
            let ids = []
            for (let backlog of this.#backlogs) {
                ids.push(backlog.id)
            }
            setItem(`gameBacklogs${this.#id}`, ids)
        }
    }

    /**
     * Retourne les noms des users
     * @returns {string[]} L'ensemble des noms des users
    */
    get userNames() {
        let names = []
        for (let user of this.#users) {
            names.push(user.name)
        }
        return names
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
            this.id = id === undefined ? self.crypto.randomUUID() : id
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
        return new User(getItem(`userName${id}`), id)
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
    #description = undefined
    #rate = []
    #finalRate = -2

    /**
     * Si l'id est défini avec undefined, alors on instancie un objet Backlog à partir des paramètres title, description et rate, sinon on instancie en récupérant les données enregistrer à partir de l'id
     * @param {string} id Id de la fonctionnalité
     * @param {string} title Titre de la fonctionnalité
     * @param {string} [description] Description (facultatif)
     * @param {Array<string, number>} [rates] Note attribuée à la fonctionnalité de 0 à 100, et -1 est l'état pour non noté, chaque note est liée à l'id d'un User (facultatif)
     * @param {number} [finalRate] Note finale de la fonctionnalité, de 0 à 100, -1 pour en cours de notation, -2 pour non noté
     * @param {string} [id] Donner l'id seulement si l'on définit une fonctionnalité déjà existante
     */
    constructor(title, description, rate, id) {
        if (title !== undefined) {
            this.id = id === undefined ? self.crypto.randomUUID() : id
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
        let rate = undefined
        if (getItem(`backlogRate${id}`) != null) {
            rate = getItem(`backlogRate${id}`)
        }
        return new Backlog(getItem(`backlogTitle${id}`), getItem(`backlogDescription${id}`), rate, id)
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
        if (rate != null) {
            this.#rate = rate
            setItem(`backlogRate${this.#id}`, this.#rate)
        }
    }

    get finalRate() {
        return this.#finalRate
    }

    set finalRate(finalRate) {
        if (finalRate < 0 || finalRate > 100) {
            throw new Error("La note finale doit être comprise entre 0 et 100")
        }
        this.#finalRate = finalRate
    }
}