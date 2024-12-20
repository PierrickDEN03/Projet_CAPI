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
            if (backlog.isAllCafe()) {
                // Convertir l'objet JavaScript en une chaîne JSON
                const jsonString = game.jsonExport();

                // Créer un Blob à partir de la chaîne JSON
                const blob = new Blob([jsonString], { type: 'application/json' });

                // Créer une URL pour le Blob
                const url = URL.createObjectURL(blob);

                // Créer un élément <a> (lien) dynamique
                const a = document.createElement('a');
                a.href = url;
                a.download = `game_${game.name}.json`;

                // Ajouter le lien au document et déclencher le clic
                document.body.appendChild(a);
                a.click();

                // Supprimer le lien du document
                document.body.removeChild(a);

                // Libérer l'URL créée
                URL.revokeObjectURL(url);
                window.location.href = "../index.html"
            } else {
                game.setFinalRate(backlog)
                window.location.href = "../game-resume/game-resume.html?id=" + gameId
            }
        } else {
            displayUser(User.initFromId(backlog.rates[currentIndex + 1].user))
        }
    })
})

function displayUser(user) {
    const h1Header = document.querySelector('main > h1')
    h1Header.textContent = backlog.title + " - " + user.name
}