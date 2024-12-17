import { Game, Backlog, User } from "../../data/game_class.js"

const gameId = new URLSearchParams(window.location.search).get('id');
const game = Game.initFromId(gameId)

//Pour chaque carte, on ajoute un event listener qui appelle la fonction lorsqu'on clique dessus
const cartesElement = document.querySelectorAll('.card')
for (let i = 0; i < cartesElement.length; i++) {
    cartesElement[i].addEventListener('click', (e) => {
        //METTRE FONCTION ICI 
        console.log(e.currentTarget.dataset.value)
    })
}