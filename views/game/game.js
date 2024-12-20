import { Game, Backlog, User } from "../../data/game_class.js"

const gameId = new URLSearchParams(window.location.search).get('id');
const backlogId = new URLSearchParams(window.location.search).get('backlog');
const backlog = Backlog.initFromId(backlogId)
let currentIndex = -1
console.log(backlog.rates)
displayUser(User.initFromId(backlog.rates[0].user))

//Pour chaque carte, on ajoute un event listener qui appelle la fonction lorsqu'on clique dessus
const cartesElements = document.querySelectorAll('.card')
cartesElements.forEach((carteElement, i) => {
    carteElement.addEventListener('click', (e) => {
        currentIndex++
        const cardValue = e.currentTarget.dataset.value == "interro" ? -1 : parseInt(e.currentTarget.dataset.value)
        backlog.setRateValue(currentIndex, cardValue)
        if (currentIndex == backlog.rates.length - 1) {
            const game = Game.initFromId(gameId)
            game.isRateOver(backlog)
            window.location.href = "../game-resume/game-resume.html?id=" + gameId
        } else {
            displayUser(User.initFromId(backlog.rates[currentIndex + 1].user))
        }
    })
})

function displayUser(user) {
    const h1Header = document.querySelector('main > h1')
    h1Header.textContent = backlog.title + " - " + user.name
}