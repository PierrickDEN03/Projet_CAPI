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
        let usersId = getItem(`gameUsers${id}`)
        let users = undefined
        if (usersId != null) {
            users = []
            for (let userId of usersId) {
                users.push(User.initFromId(userId))
            }
        }
        let backlogsId = getItem(`gameBacklogs${id}`)
        let backlogs = undefined
        if (backlogsId != null) {
            backlogs = []
            for (let backlogId of backlogsId) {
                backlogs.push(Backlog.initFromId(backlogId))
            }
        }
        return new Game(getItem(`gameName${id}`), getItem(`gameMode${id}`), users, backlogs, id)
    }

    /**
     * Fonction pour initialiser une game à partir de l'objet d'un fichier JSON
     * @param {Object} json Objet JSON
     * @returns {Game}
     */
    static initFromJson(json) {
        let users = []

        for (let user of json.newGame.users) {
            users.push(new User(user))
        }
        let backlogs = []
        for (let backlog of json.newGame.backlogs) {
            const finalRate = backlog.finalRate === undefined ? -2 : backlog.finalRate
            backlogs.push(new Backlog(backlog.title, backlog.description, Backlog.initRatesFromUsers(users), finalRate))
        }
        return new Game(json.newGame.name, json.newGame.mode, users, backlogs)
    }

    static restartFromJson(json) {
        let users = []
        for (let user of json.game.users) {
            users.push(new User(user.name, user.id))
        }
        let backlogs = []
        for (let backlog of json.game.backlogs) {
            backlogs.push(new Backlog(backlog.title, backlog.description, backlog.rates, backlog.finalRate, backlog.id, backlog.isFirstTurn))
        }
        return new Game(json.game.name, json.game.mode, users, backlogs, json.game.id)
    }

    /**
     * Fonction pour exporter une game en JSON
     * @returns {string} L'objet JSON sous forme de string
     */
    jsonExport() {
        let users = []
        for (let user of this.#users) {
            users.push({ name: user.name, id: user.id })
        }
        let backlogs = []
        for (let backlog of this.#backlogs) {
            backlogs.push({ id: backlog.id, title: backlog.title, description: backlog.description, rates: backlog.rates, finalRate: backlog.finalRate, isFirstTurn: backlog.isFirstTurn })
        }
        return JSON.stringify({ game: { name: this.#name, mode: this.#mode, users: users, backlogs: backlogs } })
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
     * Retourne le mode de vote actuel de la game, retourne donc unanimite si c'est le premier tour de vote, meme si le mode est différent
     * @param {Backlog} backlog 
     * @returns {'moyenne'|'mediane'|'unanimite'}
     */
    getCurrentMode(backlog) {
        if (backlog.isFirstTurn) {
            return "unanimite"
        } else {
            return this.#mode
        }
    }

    /**
     * Retourne le nom de tous les users
     * @returns {User[]} L'ensemble des noms des user
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

    /**
     * Défini le finalRate du backlog en fonction du mode de vote de la game
     * @param {Backlog} backlog 
     */
    setFinalRate(backlog) {
        if (!backlog.isFirstTurn) {
            switch (this.#mode) {
                case "moyenne":
                    this.averageRate(backlog)
                    break
                case "mediane":
                    this.medianRate(backlog)
                    break
                case "unanimite":
                    this.unanimtyRate(backlog)
                    break
                default:
                    throw new Error("Le mode de vote n'est pas reconnnaissable")
            }
        } else {
            this.unanimtyRate(backlog)
            backlog.passedFirstTurn()
        }
    }

    /**
     * Retourne un boolean pour savoir si la note est votée à l'unanimité, et donne la valeur de la note à finalRate
     * @param {Backlog} backlog Le backlog à vérifier
     */
    unanimtyRate(backlog) {
        const rates = backlog.rates.map(rate => rate.value)
        if (rates.every(rate => rate === rates[0])) {
            backlog.finalRate = rates[0]
        } else {
            // Si la note n'est pas votée à l'unanimité, on met la note finale à -1 pour dire que le vote est en cours
            backlog.finalRate = -1
        }
    }

    /**
     * Donne la valeur de la medianne des notes à finalRate
     * @param {Backlog} backlog Le backlog à vérifier
     */
    medianRate(backlog) {
        const rates = backlog.rates.map(rate => rate.value)
        const sortedRates = rates.sort((a, b) => a - b)
        const middle = Math.floor(sortedRates.length / 2)
        if (sortedRates.length % 2 === 0) {
            // Cela peut renvoyer une note qui n'est pas dans la liste des cartes
            backlog.finalRate = Math.floor((sortedRates[middle - 1] + sortedRates[middle]) / 2)
        } else {
            backlog.finalRate = sortedRates[middle]
        }
    }

    /**
     * Donne la valeur de la moyenne des notes à finalRate, cela peut renvoyer une note qui n'est pas dans la liste des cartes
     * @param {Backlog} backlog Le backlog à vérifier
     */
    averageRate(backlog) {
        const rates = backlog.rates.map(rate => rate.value)
        backlog.finalRate = Math.floor(rates.reduce((acc, rate) => acc + rate, 0) / rates.length)
    }

    /**
     * Retourne true si tous les paramètres sont initialisés, false sinon
     * @returns {boolean}
    */
    isInitStepByStepOver() {
        if (this.#name !== undefined && this.#mode !== undefined && this.#users.length > 0 && this.#backlogs.length > 0) {
            return true
        } else {
            return false
        }
    }
}


/**Classe à utiliser pour créer un joueur */
export class User {
    #id = undefined
    #name = undefined
    /**
     * Défini avec le nom de l'utilisateur ou le ou avec l'id pour récupérer un utilisateur déjà existant
     * @param {string} name Nom du joueur
     * @param {string} [id] Donner l'id seulement si l'on définit un utilisateur déjà existant
     */
    constructor(name, id) {
        if (name !== undefined) {
            this.id = id === undefined ? self.crypto.randomUUID() : id
            this.name = name
        } else {
            throw new Error("Le name est obligatoire pour définir un User")
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
    #rates = []
    #finalRate = -2
    /**
     * Booléen pour savoir si c'est le premier tour de vote
     */
    #isFirstTurn

    /**
     * Si l'id est défini avec undefined, alors on instancie un objet Backlog à partir des paramètres title, description et rate, sinon on instancie en récupérant les données enregistrer à partir de l'id
     * @param {string} title Titre de la fonctionnalité
     * @param {string} [description] Description (facultatif)
     * @param {RateObject[]} [rates] Notes attribuées à la fonctionnalité de 0 à 100, et -1 est l'état pour non noté, chaque note est liée à l'id d'un User (facultatif)
     * @param {number} [finalRate] Note finale de la fonctionnalité, de 0 à 100, -1 pour en cours de notation, -2 pour non noté
     * @param {string} [id] Donner l'id seulement si l'on définit une fonctionnalité déjà existante
     * @param {boolean} [isFirstTurn] Booléen pour savoir si c'est le premier tour de vote
     */
    constructor(title, description, rates, finalRate, id, isFirstTurn) {
        if (title !== undefined) {
            this.id = id === undefined ? self.crypto.randomUUID() : id
            this.title = title
            this.description = description
            this.rates = rates
            this.finalRate = finalRate
            this.isFirstTurn = isFirstTurn == null ? true : isFirstTurn
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
        const finalRate = getItem(`backlogFinalRate${id}`) == null ? -2 : getItem(`backlogFinalRate${id}`)
        const isFirstTurn = getItem(`backlogIsFirstTurn${id}`) == null ? true : getItem(`backlogIsFirstTurn${id}`)
        return new Backlog(getItem(`backlogTitle${id}`), getItem(`backlogDescription${id}`), rate, finalRate, id, isFirstTurn)
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
     * Retourne une note de la fonctionnalité à partir de son index
     * @param {number} i L'index de la note
     * @returns {RateObject}
     */
    getRate(i) {
        return this.#rates[i]
    }
    /**
     * Instancie une note de la fonctionnalité à partir de son index
     * @param {number} i L'index de la note
     * @param {RateObject} rate Note de la fonctionnalité entre 0 et 100, -1 pour non noté, avec l'id de l'utilisateur
     */
    setRate(i, rate) {
        if (rate < -1 || rate > 100 || rate == null) {
            throw new Error("La note doit être comprise entre 0 et 100")
        }
        else {
            this.#rates[i] = rate
            setItem(`backlogRate${this.#id}`, this.#rates)
        }
    }

    /**
     * Retourne la valeur de la note de la fonctionnalité à partir de son index
     * @param {number} i L'index de la note
     * @returns {number}
     */
    getRateValue(i) {
        return this.#rates[i]
    }

    /**
     * Set la valeur de la note de la fonctionnalité à partir de son index
     * @param {number} i L'index de la note
     * @param {number} rate Note de la fonctionnalité entre 0 et 100, -1 pour non noté
     */
    setRateValue(i, rate) {
        if (rate < -1 || rate > 100 || rate == null) {
            throw new Error("La note doit être comprise entre 0 et 100")
        }
        else {
            this.#rates[i].value = rate
            setItem(`backlogRate${this.#id}`, this.#rates)
        }
    }

    /**
     * Instancie toutes les notes de la fonctionnalité
     * @param {RateObject[]} rates Liste des notes attribuées à la fonctionnalité
     */
    set rates(rates) {
        if (rates != null) {
            for (let i = 0; i < rates.length; i++) {
                this.setRate(i, rates[i])
            }
            setItem(`backlogRate${this.#id}`, this.#rates)
        }
    }

    /**
     * Retourne toutes les notes de la fonctionnalité
     * @returns {RateObject[]} Liste des notes attribuées à la fonctionnalité
     */
    get rates() {
        return this.#rates
    }

    /**
     * Retourne l'index de la note à partir de l'utilisateur
     * @param {User} user 
     * @returns {number} L'index de la note
     */
    indexRateFromUser(user) {
        let index = this.#rates.findIndex(rate => rate.user === user.id)
        return index
    }

    /**
     * Retourne la valeur de la note à partir de l'utilisateur
     * @param {User} user 
     * @returns {number} La valeur de la note
     */
    valueRateFromUser(user) {
        let rate = this.#rates.find(rate => rate.user === user.id)
        return rate.value
    }

    /**
     * Retourne la note finale de la fonctionnalité
     * @returns {number} Note finale de la fonctionnalité entre 0 et 100, -1 pour en cours de notation, -2 pour non noté
     */
    get finalRate() {
        return this.#finalRate
    }

    /**
     * Instancie la note finale de la fonctionnalitéote
     * @param {number} finalRate Note finale de la fonctionnalité entre 0 et 100, -1 pour en cours de notation, -2 pour non noté
     */
    set finalRate(finalRate) {
        if (finalRate != null) {
            if (finalRate < -2 || finalRate > 100) {
                throw new Error("La note finale doit être comprise entre 0 et 100")
            }
            this.#finalRate = finalRate
        } else {
            this.#finalRate = -2
        }
        setItem(`backlogFinalRate${this.#id}`, this.#finalRate)
    }

    /**
     * Retourne true si c'est le premier tour de vote, sinon false
     * @returns {boolean}
     */
    get isFirstTurn() {
        return this.#isFirstTurn
    }

    /**
     * Donne la valeur de isFirstTurn
     * @param {boolean} isFirstTurn
     */
    set isFirstTurn(isFirstTurn) {
        this.#isFirstTurn = isFirstTurn
        setItem(`backlogIsFirstTurn${this.#id}`, this.#isFirstTurn)
    }

    passedFirstTurn() {
        if (this.isFirstTurn == true) {
            this.isFirstTurn = false
        }
    }

    /**
     * Retourne des notes intalisia (donc égale à -1) à partir des utilisateurs d'un objet utilisateurs
     * @param {User[]} users Liste des utilisateurs
     * @returns {RateObject[]} Liste des notes initialisées
     */
    static initRatesFromUsers(users) {
        let rates = []
        for (let user of users) {
            rates.push({ value: -1, user: user.id })
        }
        return rates
    }
}

/**
 * @typedef {Object} RateObject
 * @property {number} value La valeur de la note, entre 0 et 100, et -1 pour non noté.
 * @property {string} user L'id de l'utilisateur qui a noté.
 */